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
      return 5 * 10**10; // 5 MATIC = 5 000 000 000 000 000 000 (18 decimals). We're going with 0.5 Matic cause the faucets don't give a lot
    } else if (len == 4) {
      return 3 * 10**10; // To charge smaller amounts, reduce the decimals. This is 0.3
    } else {
      return 1 * 10**10;
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
  if (balanceOf(msg.sender)>0) revert AlreadyRegistered();
  if (!valid(name)) revert InvalidName(name);
    uint _price = price(name);

    require(msg.value >= _price, "Not enough Matic paid");
    uint256 newRecordId = _tokenIds.current();

    _safeMint(msg.sender, newRecordId);
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

// function setRecord(string calldata name, string calldata record) public {
//   if (msg.sender != domains[name]) revert Unauthorized();
//   records[name] = record;
// }

//   function getRecord(string calldata name) public view returns(string memory) {
//       return records[name];
//   }

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