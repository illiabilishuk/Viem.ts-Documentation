// This code serves as a custom documentation of the Viem.ts library
// This file demonstrates how to work with Viem.ts Public Clients
// Public Actions do not require any special permissions nor do they provide signing capabilities to the user
// They mainly serve as onchain getter functions

// You will find comments above every feature to ease the comprehension of the code


// Import methods from Viem.ts
import { createPublicClient, http, encodeFunctionData } from 'viem';

// Import variables for placeholding
import vars from '../vars.js';

// Import a desired chain from the list of Viem.ts chains
import { mainnet } from 'viem/chains';


// Create a Public Client
const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
});


//ACTIONS


// createAccessList()
// Determines storage slots for the variables
// Helps to save gas as less computation is done
const accessList = await publicClient.createAccessList({
    account: vars.account, // Address that initializes the transaction - Optional
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
    data: vars.data, // Function selector + args - Optional
    gasPrice: vars.gasPrice, // Gas price for legacy code - Optional
    maxFeePerGas: vars.maxFeePerGas, // Max fee per gas (EIP-1559) - Optional
    maxPriorityFeePerGas: vars.maxPriorityFeePerGas, // Validator's tip - Optional
    to: vars.to, // Address to - Optional
    value: vars.value, // Amount of Wei - Optional
});

// getBalance()
// Returns the balance of an address in Wei
const getBalance = await publicClient.getBalance({
    address: `0x${vars.address}`, // Address whose balance is checked
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
});

// getTransactionCount()
// Returns the number of transactions an account has broadcast / sent
const getTransactionCount = await publicClient.getTransactionCount({
    address: `0x${vars.address}`, // Address whose balance is checked
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
});

// getBlock()
// Returns information about a block at a block number, hash or tag
const getBlock = await publicClient.getBlock({
    blockHash: vars.blockHash, // Information at a given block hash - Optional
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
    includeTransactions: vars.includeTransactions, // Whether or not to include transactions - Optional
});


// getBlockNumber()
// Returns the number of the most recent block seen
const getBlockNumber = await publicClient.getBlockNumber({
    cacheTime: vars.cacheTime, // Time (in ms) that cached block number will remain in memory - Optional
});

// getBlockTransactionCount()
//Returns the number of Transactions at a block number, hash or tag
const getBlockTransactionCount = await publicClient.getBlockTransactionCount({
    blockHash: vars.blockHash, // Information at a given block hash - Optional
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
});

// simulateBlocks()
// Simulates a set of calls on block(s) with optional block and state overrides
const simulateBlocks = await publicClient.simulateBlocks({
    blocks: [ // Describes the block we want to simulate
        {
            blockOverrides: { // Changes block's global parameters
                number: vars.number, // Changes block's number
                gasLimit: vars.gasLimit, // Changes block's gas limit - Optional
                baseFeePerGas: vars.baseFeePerGas, // Changes block's base fee per gas - Optional
            },
            calls: [ // Calls simulated in the block
                {
                    from: vars.addressFrom, // Address from
                    to: vars.addressTo, // Address to
                    value: vars.value, // Value of transaction
                    data: vars.data, // Additional calldata - Optional
                }
            ], 
            stateOverrides: [ // Temporary changes for simulation
                {
                    address: `0x${vars.address}`, // Address
                    balance: vars.balance, // Assigining a new balance
                    nonce: vars.nonce, // Assigining a new nonce - Optional
                    code: vars.code, // Changing contract's code - Optional
                    stateDiff: vars.stateDiff, // Changing contract's storage - Optional
                }
            ],
        }
    ],
    returnFullTransactions: true, // True: extended data, false: mandatory only - Optional
    traceTransfers: true, // True: tracing ETH transfers - Optional
    validation: true, // True: stricter functionality assurance, false: less checks - Optional
});

// watchBlockNumber()
// Watches and returns incoming block numbers

const watchBlockNumber = publicClient.watchBlockNumber({
    onBlockNumber: blockNumber => console.log(blockNumber), // Subscribing on the latest block
    emitMissed: true, // Whether or not to emit missed block numbers to the callback - Optional
    emitOnBegin: true, // Whether or not to emit the latest block number to the callback when the subscription opens - Optional
    poll: true, // Whether or not to use a polling mechanism to check for new block numbers instead of a WebSocket subscription - Optional
    pollingInterval: vars.pollingInterval, // Polling frequency - Optiona;
});