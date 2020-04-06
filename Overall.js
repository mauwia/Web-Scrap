const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

exports.getAll=(req,res,next)=>{
    const url = 'http://covid.gov.pk';
    let item=[]
    puppeteer
      .launch()
      .then(browser => browser.newPage())
      .then(page => {
        return page.goto(url).then(function() {
          return page.content();
        });
      })
      .then(html => {
        // console.log(html);
        const $ =cheerio.load(html)
        $('#statistics').toArray().map(it=>{
            $(it).find('.text-muted').toArray().map(i=>{
                $(i).parent().toArray().map(another=>{
                    item.push($(another).text().trim())
                })
            })
        })
        let data={}
        let property=[],value=[]
        item=item.map(it=>{
             property.push(it.split('\n')[0].trim())
             value.push(it.split('\n')[1].trim())
             return it.split('\n')
        })
        value[0]=item[0][2].trim()
        for(let i=0;i<property.length;i++){
            data[`${property[i]}`]=value[i]
        }
        res.status(200).json({
            message:'200',data:data
        })
      })
      .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    });
    
}
    