// //SPDX-License-Identifier: MIT
// pragma solidity >=0.8.0 <0.9.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract BazarefiAttestation is ERC721URIStorage, Ownable {
// 	uint256 private _nextTokenId;

// 	constructor(
// 		address initialOwner
// 	) ERC721("Bazarefi Attestation", "BZRATT") Ownable() {}

// 	function _baseURI() internal pure override returns (string memory) {
// 		return "bazarefi.com/attestation/";
// 	}

// 	function safeMint(address to, string memory uri) public onlyOwner {
// 		uint256 tokenId = _nextTokenId++;
// 		_safeMint(to, tokenId);
// 		_setTokenURI(tokenId, uri);
// 	}

// 	// The following functions are overrides required by Solidity.

// 	function tokenURI(
// 		uint256 tokenId
// 	) public view override(ERC721URIStorage) returns (string memory) {
// 		return super.tokenURI(tokenId);
// 	}

// 	function supportsInterface(
// 		bytes4 interfaceId
// 	) public view override(ERC721) returns (bool) {
// 		return super.supportsInterface(interfaceId);
// 	}
// }
