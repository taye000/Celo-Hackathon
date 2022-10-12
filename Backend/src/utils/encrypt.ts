export const encrypt = async (value: string) => {
  let bufferObj = Buffer.from(value, "utf8");
  return bufferObj.toString("base64");
};
export const decrypt = async (value: string) => {
  let bufferObj = Buffer.from(value, "base64");
  return bufferObj.toString("utf8");
};
