// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./UintToStr.sol";

contract BountyMaker is ERC721URIStorage, Ownable {
    mapping(address => mapping(string => uint256)) public claimed;
    mapping(address => mapping(string => uint128)) public winners;
    mapping(address => bool) private admins;
    mapping(string => Bounty) public bountys;
    mapping(string => uint[]) public rewards;
    IERC20 public token;
    bool public open;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    struct Bounty{
        string uri;
        uint128 tokenLimit;
        bool active;    
        uint256 endTime;
    }

    event Claim(
        address indexed _receiver,
        string _bountyId,
        uint128 _bountyIndex,
        uint256 _contractIndex,
        bool _isAdmin
    );
    event BountyCreated(
        string _bountyId,
        uint[] _rewards
    );
    event WinnersDeclared(
        string _bountyId
    );
    event ERC20PaymentReleased(IERC20 indexed token, address to, uint256 amount);

function openToPublic(bool _isOpen) public onlyOwner{
  open=_isOpen;
}
    constructor(IERC20 _token)
        ERC721("bountyMaker", "BOUNTYMAKER")
    {
        admins[msg.sender] = true;
        token=_token;
        open=false;
        _tokenIdTracker.increment();
    }
        modifier onlyAdmin() {
        if(!open)
        require(admins[msg.sender] == true);
        _;
    }

    modifier eligibiltyCheck(string memory _bountyId, address to) {
        require(
            !bountys[_bountyId].active,
            ""
        );
        require(
            winners[to][_bountyId] > 0,
            ""
        );
        require(
            claimed[to][_bountyId] == 0,
            ""
        );
        _;
    }
    modifier rewardEligibiltyCheck(string memory _bountyId, address to) {
        require(
             winners[to][_bountyId]<=rewards[_bountyId].length ,
            " address is not eligible for reward"
        );
        _;
    }

    function updateAdmin(address _admin, bool isAdmin) external onlyOwner {
        admins[_admin] = isAdmin;
    }
    

    function createBounty(
        string memory _bountyId,
        string memory uri,
        uint128 _tokenLimit,
        uint[] memory _rewards,
        uint256 _endTime
    ) external onlyAdmin {
        require(_endTime > block.timestamp, "Invalid Value for timestamp");
        require(
            bountys[_bountyId].tokenLimit == 0,
            ""
        );
        require(_tokenLimit > 0, "Limit > 0");
        require(_tokenLimit >= _rewards.length, " Limit must be more than no of rewards");
        uint totalReward=0;
        for(uint i=0;i<_rewards.length;i++){
            totalReward+=_rewards[i];
        }
        require(totalReward<token.balanceOf(address(msg.sender)),"Payment: Insufficient balance of creator");
        require(totalReward<token.allowance(address(msg.sender),address(this)),"Payment: Not approved");
        SafeERC20.safeTransferFrom(token,address(msg.sender),address(this), totalReward);
        // address[] memory _winners;
        Bounty memory bounty = Bounty(uri,_tokenLimit,true,_endTime);
        rewards[_bountyId]=_rewards;
        bountys[_bountyId] = bounty;
        emit BountyCreated(_bountyId,_rewards);
    }

    function setBountyWinners(string memory _bountyId, address[] memory _winners) external onlyAdmin {
        require(bountys[_bountyId].active ,
            " Bounty is not active");
        require(bountys[_bountyId].tokenLimit==_winners.length ,
            " No of winners must be equal to tokenLimts");
        for(uint128 i=0;i<_winners.length;i++){
            winners[_winners[i]][_bountyId] = i+1;
        }    
        bountys[_bountyId].active=false;     
        // bountys[_bountyId].winners=_winners;     
        emit WinnersDeclared(_bountyId);               
    }

      function issueToken(
        string memory _bountyId,
        address to,
        bool _isAdmin
    ) internal eligibiltyCheck(_bountyId, to) returns (uint256) {
        uint128 bountyTokenIndex =winners[to][_bountyId];
        string memory _baseURI =bountys[_bountyId].uri;
        string memory _uri = string(
            abi.encodePacked(
                _baseURI,
               UintToStr.uint2str(bountyTokenIndex),
                ".json"
            )
        );

        uint256 newTokenId = _tokenIdTracker.current();
        claimed[to][_bountyId] = newTokenId;

        _safeMint(to, newTokenId);
        emit Claim(to, _bountyId, bountyTokenIndex, newTokenId, _isAdmin);

        _setTokenURI(newTokenId, _uri);

        _tokenIdTracker.increment();

        if(winners[to][_bountyId]<=rewards[_bountyId].length){
            release(to,_bountyId);
        }

        return newTokenId;
    }

    function adminClaimToken(
        string memory _bountyId,
        address to
    ) external onlyAdmin returns (uint256) {
        return issueToken(_bountyId, to, true);
    }

    function claimToken(string memory _bountyId)
        external
        returns (uint256)
    {    
        return issueToken(_bountyId, msg.sender, false);
    }

   
    function release( address to, string memory _bountyId) internal rewardEligibiltyCheck(_bountyId, to) {
        uint256 payment = rewards[_bountyId][(winners[to][_bountyId]-1)];
        require(payment != 0, "Payment: account is not due payment");
        require(payment<=token.balanceOf(address(this)),"Payment: Insufficient balance");

        winners[to][_bountyId]=0;
        SafeERC20.safeTransfer(token, to, payment);
        emit ERC20PaymentReleased(token, to, payment);
    }

    receive() external payable virtual {}
}