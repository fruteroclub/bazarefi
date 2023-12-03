// //SPDX-License-Identifier: MIT
// pragma solidity >=0.8.0 <0.9.0;

// // Useful for debugging. Remove when deploying to a live network.
// import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

// /**
//  * A smart contract that allows changing a state variable of the contract and tracking the changes
//  * It also allows the owner to withdraw the Ether in the contract
//  * @author BuidlGuidl
//  */
// contract BazarefiToken is ERC20, ERC20Burnable, Ownable {
// 	constructor(
// 		address initialOwner
// 	) ERC20("Bazarefi Token", "BZREFI") Ownable() {}

// 	/**
// 	 * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
// 	 *
// 	 * @param to (address) - receiver of the minted tokens
// 	 * @param amount (uint256) - amount of tokens to be minted to the receiver
// 	 */
// 	function mint(address to, uint256 amount) public onlyOwner {
// 		_mint(to, amount);
// 	}

// 	/**
// 	 * Function that allows the owner to withdraw all the Ether in the contract
// 	 * The function can only be called by the owner of the contract as defined by the onlyOwner modifier
// 	 */
// 	function withdraw(uint256 amount) public onlyOwner {
// 		require(
// 			amount <= address(this).balance,
// 			"Insufficient balance in contract"
// 		);
// 		payable(owner()).transfer(amount);
// 	}

// 	/**
// 	 * Function that allows the contract to receive ETH
// 	 */
// 	receive() external payable {}
// }
