let getFacebookMessageFromEntry = (data) => {
  let entries = data ? data.entry : null;
  let dataFilter = [];

  if (!entries || !Array.isArray(entries)) throw new Error("Data from api layer error");

  entries.map(entry => {
    let messaging = entry.messaging;
    messaging.map(message => {
      let userMessage = {
        id: null,
        message: null
      }
      if (message.sender) userMessage.id = message.sender.id;
      if (message.message) userMessage.message = message.message.text;
      dataFilter.push(userMessage);
    })
  })

  return dataFilter;
}

module.exports = {
  getFacebookMessageFromEntry
}