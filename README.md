# Decentralized Ticket Sales

Allow [Organizers](backend/contracts/Organizer.sol) to set up [Events](backend/contracts/Event.sol) to sell [Tickets](backend/contracts/Ticket.sol) with the Ethereum blockchain with a static React/Next frontend.

Technologies involved:

- **Backend**: Solidity lang, OpenZeppelin, Truffle, Ethersjs
- **Frontend**: Reactjs, Nextjs, TailwindCSS, GitHub pages
- **CICD**: GitHub Actions

# How-To

https://github.com/flaprimo/blockchain-developer-bootcamp-final-project/blob/dev/docs/assets/howto.mp4

# TODO

- [x] JS/Solidity Tests fully cover all functionalities for creating/listing Organizers, Events and Tickets and buying tickets.
- [x] Contracts successfully deployed on Goerli Ethereum network (Etherscan links: [Organizer](https://goerli.etherscan.io/address/0x5011A3749ed722D382aa25f7268454EAf9601720), [Event](https://goerli.etherscan.io/address/0xB753038FEF52277cB7298a3eA0Ad2876132B37D2), [Ticket](https://goerli.etherscan.io/address/0xdF8a4E3EF4A65350Cba1658B32D3d2b8182b54f8))
- [x] Frontend supports Metamask connection and linking to a deployed Organizer Contract
- [x] Frontend supports Creating and listing Organizers
- [ ] Frontend supports Creating and listing Events and Tickets
- [ ] Implement Oracles for buying tickets with fiat currencies

## Documentation

- [Avoiding Common Attacks](docs/avoiding_common_attacks.md)
- [Design Pattern Decisions](docs/design_pattern_decisions.md)
- [Architecture Diagram](docs/blockchain_ticketing_system.drawio)
- [Testnet address and network where the contracts have been deployed](docs/deployed_address.txt)

## Backend

### Tests

Need Nodejs installed.

1. Get to backend folder `cd backend`
2. Install dependencies `npm install`
3. (Optional) Set test network in `truffle-config.js`
   ```js
   networks: {
       development: {
           host: "127.0.0.1", // Localhost (default: none)
           port: 9545, // Standard Ethereum port (default: none)
           network_id: "5777", // Any network (default: none)
       },
   ```
4. Launch test network with `truffle develop`
5. Launch tests with `truffle test`

   ```log
   Using network 'development'.


   Compiling your contracts...
   ===========================
   > Everything is up to date, there is nothing to compile.
   Deployed organizer 0x18be1851f6ca9cC052182E16f114DFD033dFdB3F
   Deployed event 0xB3347e58F21d2EeD7B516822E92971B6adA02415
   Deployed ticket 0x2D61070bF56635A3A71BbCE6C786B1E996F3F1D6


   Event
       ✔ Create Event (158ms)

   Organizer
       ✔ Create Organizer (54ms)
       ✔ Check that user is an Organizer only after creating one (52ms)
       ✔ Cannot create multiple Organizers from same account (269ms)
       ✔ Can create multiple Organizers (81ms)

   Ticket
       ✔ Create Ticket (69ms)
       ✔ Buy a ticket (121ms)
       ✔ Available tickets (60ms)


   8 passing (3s)
   ```

## Frontend

Public frontend [link](https://flaprimo.github.io/blockchain-developer-bootcamp-final-project/).

Need Nodejs installed.

1. Get to frontend folder `cd frontend`
2. Install dependencies `npm install`
3. Run frontend with `npm run dev`
