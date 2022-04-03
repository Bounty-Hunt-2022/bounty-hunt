// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { StringUtils } from "./libraries/StringUtils.sol";
import {Base64} from "./libraries/Base64.sol";

contract Domains is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // Here's our domain TLD!
  string public tld;
  string svgPartOne = '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#B)" d="M0 0h270v270H0z"/><defs><filter id="A" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><text x="12.5" y="71" font-size="27" fill="#12957D" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">BountyHunter</text><defs><linearGradient id="B" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="#977FCC" stop-opacity=".36"/><stop offset="1" stop-color="#977FCC" stop-opacity=".76"/></linearGradient></defs><text x="32.5" y="231" font-size="27" fill="#fff" filter="url(#A)" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
  string svgPartTwo = '</text></svg>';

  mapping(string => address) public domains;
  mapping(string => string) public records;
  mapping (uint => string) public names;
		
  address payable public owner;

error Unauthorized();
error AlreadyRegistered();
error InvalidName(string name);

constructor(string memory _tld) ERC721 ("Hunter Name Service", "HNS") payable {
  owner = payable(msg.sender);
  tld = _tld;
}
  // This function will give us the price of a domain based on length
  function price(string calldata name) public pure returns(uint) {
    uint len = StringUtils.strlen(name);
    require(len > 0);
    if (len == 3) {
      return 5 * 10**17; // 5 MATIC = 5 000 000 000 000 000 000 (18 decimals). We're going with 0.5 Matic cause the faucets don't give a lot
    } else if (len == 4) {
      return 3 * 10**17; // To charge smaller amounts, reduce the decimals. This is 0.3
    } else {
      return 1 * 10**17;
    }
  }

  modifier onlyOwner() {
  require(isOwner());
  _;
}

function isOwner() public view returns (bool) {
  return msg.sender == owner;
}

function withdraw() public onlyOwner {
	uint amount = address(this).balance;
	
	(bool success, ) = msg.sender.call{value: amount}("");
	require(success, "Failed to withdraw Matic");
} 

function register(string calldata name, string calldata metadata) public payable {
	if (domains[name] != address(0)) revert AlreadyRegistered();
  if (!valid(name)) revert InvalidName(name);
    uint _price = price(name);

    // Check if enough Matic was paid in the transaction
    require(msg.value >= _price, "Not enough Matic paid");
// string memory _name = string(abi.encodePacked(name, ".", tld));
		// Create the SVG (image) for the NFT with the name
    // string memory finalSvg = string(abi.encodePacked(svgPartOne, _name, svgPartTwo));
    uint256 newRecordId = _tokenIds.current();
  	// uint256 length = StringUtils.strlen(name);
		// string memory strLen = Strings.toString(length);


		// Create the JSON metadata of our NFT. We do this by combining strings and encoding as base64
    // string memory json = Base64.encode(
    //   bytes(
    //     string(
    //       abi.encodePacked(
    //         '{"name": "',
    //         _name,
    //         '", "description": "A domain on the Hunter name service", "image": "data:image/svg+xml;base64,',
    //         Base64.encode(bytes(finalSvg)),
    //         '","length":"',
    //         strLen,
    //         '"}'
    //       )
    //     )
    //   )
    // );

    // string memory finalTokenUri = string( abi.encodePacked("data:application/json;base64,", json));
    _safeMint(msg.sender, newRecordId);
    // _setTokenURI(newRecordId, finalTokenUri);
    _setTokenURI(newRecordId, metadata);

    domains[name] = msg.sender;

    _tokenIds.increment();
    names[newRecordId] = name;
    // setRecord(name,record);
  }
  // Other functions unchanged

   function getAddress(string calldata name) public view returns (address) {
      // Check that the owner is the transaction sender
      return domains[name];
  }

function setRecord(string calldata name, string calldata record) public {
  if (msg.sender != domains[name]) revert Unauthorized();
  records[name] = record;
}

  function getRecord(string calldata name) public view returns(string memory) {
      return records[name];
  }

  // Add this anywhere in your contract body
function getAllNames() public view returns (string[] memory) {
  string[] memory allNames = new string[](_tokenIds.current());
  for (uint i = 0; i < _tokenIds.current(); i++) {
    allNames[i] = names[i];
  }

  return allNames;
}

function valid(string calldata name) public pure returns(bool) {
  return StringUtils.strlen(name) >= 3 && StringUtils.strlen(name) <= 10;
}
}