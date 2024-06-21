
import { create } from "ipfs-http-client";
/////////////////////////IPFS SERVER/////////////////////
const IPFS_NODE_HOST = 'localhost';
const ipfs_port = 5001;

let ipfs;
// Function to initialize IPFS client
async function initIPFSClient() {
    try {
        ipfs = create({
            host: IPFS_NODE_HOST,
            protocol: "http",
            port: ipfs_port,
        });

        // Check IPFS connection status
        const isOnline = await ipfs.isOnline();
        if (isOnline) {
            console.log("connected to IPFS");
        } else {
            console.log("IPFS client failed to connect");
            // Handle connection failure here
        }
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            console.error("IPFS server is not running or accessible");
            // Handle connection refusal error here
        } else {
            console.error("Error connecting to IPFS server:", error);
            // Handle other connection errors here
        }
    }
}

export {ipfs,initIPFSClient}