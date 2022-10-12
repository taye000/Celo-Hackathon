export const Mpesapayload = async (payload: any) => {
    const resultDesc = payload["Body"]["stkCallback"]["ResultDesc"].toString();
    console.log(resultDesc);
  
    const status = resultDesc.search(/]/)
      ? resultDesc.substr(resultDesc.search(/]/) + 1)
      : resultDesc;
  
    const checkoutId = payload["Body"]["stkCallback"]["CheckoutRequestID"];
  
    let message;
  
    switch (status) {
      case "DS timeout":
        message = `Request failed. M-Pesa didn't respond. Try again in 5 seconds.`;
        break;
  
      case "SMSC ACK timeout":
        message =
          "Request failed. You did not respond, may be your phone is not reachable.";
        break;
  
      case "Request cancelled by user":
        message = "Request cancelled. You cancelled request. Try again.";
        break;
  
      case "The balance is insufficient for the transaction":
        message = "The balance is insufficient for the transaction. Try again.";
        break;
  
      case "The service request is processed successfully.":
        message = "Request successful. Transaction has been processed.";
        break;
      default:
        break;
    }
  
    if (!status.includes("successful")) {
      return {
        data: null,
      };
    }
    const data = payload["Body"]["stkCallback"]["CallbackMetadata"]["Item"];
  
    return {
      amount: data.find((a: any) => a.Name === "Amount").Value,
      phone: data.find((a: any) => a.Name === "PhoneNumber").Value,
      transactionId: data.find((a: any) => a.Name === "MpesaReceiptNumber").Value,
      checkoutId,
      moreData: data,
    };
  };
  