import { Injectable,HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {status: HttpStatus.OK,date:[{"name":"Welcome"}]};
  }
  viewUserData(userDataArr: any): any {
    return {status: HttpStatus.OK, message:"Successful"} 
  }
}
// Here we do our database query and return to the controller.