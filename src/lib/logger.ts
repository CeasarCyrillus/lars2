export const logger = {
  debug: (reporter: string, message: any) => console.log(`%c [DEBUG] [${reporter}]: ${message} `, 'background: light-gray; color: gray'),
  info: (reporter: string, message: any) => console.log(`%c [DEBUG] [${reporter}]: ${message} `, 'background: light-blue; color: black')
}