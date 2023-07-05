import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { PostBenefitsDto } from './dto/post-benefits.dto';

@Injectable()
export class TestCrudService {

  async getBenefits() {
    const dbQuery = `
      SELECT benefit, id
      FROM benefits_master`;
    const entityManager = getManager();
    try{
      const result = await entityManager.query(dbQuery);
      return result;
    }catch(err){
      return err;
      console.log(err);
    }
  }

  async getBenefitsRate(benefitsArray: PostBenefitsDto["benefitsIdArr"]) {
    const dbQuery = `
      SELECT SUM(rate) as total_rate
      FROM benefits_master
      WHERE id IN (${benefitsArray.join(",")});
    `
    const entityManager = getManager()
    try {
      const dbResponse = await entityManager.query(dbQuery);
      return dbResponse
    }
    catch(err) {
      return err;
    }
  }

  async createQuote(quoteData: PostBenefitsDto["quoteDetails"]) {
    const {name, category, details} = quoteData;
    const dbQuery = `
      INSERT INTO quote
        (name, category, quote_details)
      VALUES
        ("${name}", "${category}", "${details}");
    `
    const entityManager = getManager();
    try {
      const dbResponse = await entityManager.query(dbQuery);
      return dbResponse;
    }
    catch(err) {
      return err;
    }
  }

  async insertEmployee(postBenefitData: PostBenefitsDto["employeeDetails"], quoteId: number) {
    const employeeData = postBenefitData.map(eachEmployee => `
      ("${eachEmployee.Name}", "${eachEmployee.Gender}", "${eachEmployee.Age}", ${eachEmployee.Number}, ${quoteId})
    `)

    const dbQuery = `
      INSERT INTO employee_details
        (name, gender, age, number, quote_id)
      VALUES
        ${
          employeeData.join(",")
        };
    `
    console.log(dbQuery)
    const entityManager = getManager();
    try {
      const dbResponse = await entityManager.query(dbQuery);
      return dbResponse;
    }
    catch(err) {
      return err;
    }
  }

  async insertQuoteBenefits(postBenefitData: PostBenefitsDto["benefitsIdArr"], quoteId: number) {
    const benefitsIdList = postBenefitData.map(eachId => `
      ("${eachId}", "${quoteId}")
    `)

    const dbQuery = `
      INSERT INTO quote_benefits
        (benefit_id, quote_id)
      VALUES
        ${
          benefitsIdList.join(",")
        };
    `
    const entityManager = getManager();
    try {
      const dbResponse = await entityManager.query(dbQuery);
      return dbResponse;
    }
    catch(err) {
      return err;
    }
  }

  async getTotalEployees(quoteId: number) {
    const dbQuery = `
      SELECT COUNT(id)
      FROM employee_details
      WHERE quote_id = ${quoteId};
    `
    const entityManager = getManager();
    try {
      const dbResponse = await entityManager.query(dbQuery);
      return dbResponse;
    }
    catch(err) {
      return err;
    }
  }
  
  calculatePremium(totalRate: number, totalEmployee: number) {
    const calculatedPremium = Number(totalRate) * Number(totalEmployee);
    return calculatedPremium
  }

  // async benefitsArray(postBenefitData: PostBenefitsDto) {
  //   return postBenefitData;
  // }

  // async createAll(quoteData: CreateQuoteDto[]) {

  //   const dataList = quoteData.map(eachQuote => 
  //     `("${eachQuote.name}", "${eachQuote.category}", "${eachQuote.quote_details}")`
  //   );

  //   const dbQuery = `
  //     INSERT INTO quote
  //       (name, category, quote_details)
  //     VALUES
  //       ${
  //         dataList.join(",")
  //       };
  //   `
  //   const entityManager = getManager();
  //   const dbResponse = await entityManager.query(dbQuery);
  //   console.log(dbResponse);
  //   return dbResponse;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} testCrud`;
  // }

  // update(id: number, updateTestCrudDto: UpdateTestCrudDto) {
  //   return `This action updates a #${id} testCrud`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} testCrud`;
  // }
}
