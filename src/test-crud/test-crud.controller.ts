import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { TestCrudService } from './test-crud.service';
import { CreateTestCrudDto } from './dto/create-test-crud.dto';
import { UpdateTestCrudDto } from './dto/update-test-crud.dto';
import { CreateQuoteDto } from './dto/create-quote.dto'
import { Response, response } from 'express'
import { PostBenefitsDto } from './dto/post-benefits.dto';

@Controller()
export class TestCrudController {
  constructor(private readonly testCrudService: TestCrudService) {}

  @Post('post-user-data')
  async benefitsArray(@Res({passthrough: true}) res: Response, @Body() postBenefitsDto: PostBenefitsDto) {
    const quoteDetails = postBenefitsDto.quoteDetails
    const benefitsArray = postBenefitsDto.benefitsIdArr
    const employeeDetails = postBenefitsDto.employeeDetails

    let quoteId: number;
    let totalBenefitsRate: number;
    let totalEmployee: number;
    try {
      const benefitsRate = await this.testCrudService.getBenefitsRate(benefitsArray)
      totalBenefitsRate = benefitsRate[0].total_rate

      const createQuoteResponse = await this.testCrudService.createQuote(quoteDetails)
      quoteId = createQuoteResponse.insertId

      const insertEmp = await this.testCrudService.insertEmployee(employeeDetails, quoteId)
      const insertQuote = await this.testCrudService.insertQuoteBenefits(benefitsArray, quoteId)
      const getTotal = await this.testCrudService.getTotalEployees(quoteId)
      totalEmployee = getTotal[0]['COUNT(id)']

      const premiumAmount = this.testCrudService.calculatePremium(totalBenefitsRate,totalEmployee)
      return premiumAmount
    }
    catch(err) {
      return err
    }
  }

  // @Post('create-quotes')
  // async createAll(@Res({passthrough: true}) res: Response, @Body() createQuoteDto: CreateQuoteDto[]) {
  //   // console.log("Req body: ", createQuoteDto);
  //   const dbResponse = await this.testCrudService.createAll(createQuoteDto);
  //   return dbResponse;
  // }

  @Get('get-benefits')
  async getBenefits(@Res({passthrough: true}) res: Response) {
    const dbRes = await this.testCrudService.getBenefits();
    if (Object.keys(dbRes).length === 0)
      res.status(401).send({message: "Data not found."});
    else
      return dbRes;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.testCrudService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTestCrudDto: UpdateTestCrudDto) {
  //   return this.testCrudService.update(+id, updateTestCrudDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.testCrudService.remove(+id);
  // }
}
