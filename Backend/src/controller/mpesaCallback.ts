export const tx_timeout = (req: any, res: any) => {
    res.send("Transaction timed out");
    console.log("Transaction timed out");
  };
  
  export const tx_result = (req: any, res: any) => {
    res.status(200).send("Transaction successful");
    console.log("Transaction successful");
  };
  
  export const callback = async (req: any, res: any) => {
    const body = req.body.Body;
    console.log("PROCESSING CALLBACK |".repeat(5));
  
    console.log(body);
  };
  