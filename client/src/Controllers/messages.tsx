interface Message {
  formText: string;
  name: string;
  photo: string;
  authEmail: string;
  token: string|undefined;
}

export const sendMessage = async (message: Message): Promise<boolean> => {
  await fetch(`/api/messages/send`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(message),
  });
  return true
}
