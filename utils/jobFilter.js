const { filter } = require("lodash");

class JobFilter{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.q 
        ?{
            country:{$regex: this.queryStr.q, $options:"i"},
        }
        :{};
        console.log(`Search Query String: ${JSON.stringify(this.queryStr.q)}`)
        this.query = this.query.find({...keyword})
        return this;
    }

    filter() {
        const copyQueryStr = {...this.queryStr};

        let removItems = ["q","page","limit"];
        removItems.forEach(item => delete copyQueryStr[item]);

        let queryStr = JSON.stringify(copyQueryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log(`Filter query string: ${queryStr}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    pageination() {
        const page = parseInt(this.queryStr.page) || 1;
        const pageSize = parseInt(this.queryStr.limit) || 50;
        const skip = (page - 1) * pageSize //2-1*50=>50

        this.query = this.query.skip(skip).limit(pageSize);
        return this;
    }
}



module.exports = JobFilter;