/*Communication tower is the file responsible for the communication between modules 
to avoid coupling issues between modules as the modules can stream information
through dedicated channels and modules that are interested in these information 
can listen to the channel that contains the information they need*/

// Channels

const channels = {
  c1: "",
  c2: "",
  c3: "",
  c4: "",
  c5: "",
};

export function stream(channel, message) {
  channels[channel] = message;
}
export function listen(channel) {
  return channels[channel];
}
