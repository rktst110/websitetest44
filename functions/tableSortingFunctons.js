
 //<!-- General Table Sorting and Pushing Data into Tables Code STARTS HERE -->


 
document.head.appendChild(document.createElement('style')).innerHTML = `table, th, td, caption, th span,  th i  {color: white; }   table { width: 100%; } `;
document.head.appendChild(document.createElement('style')).innerHTML = `table tr td:nth-child(1) {  width: 120px; background-color: #5c58dd; border-radius: 15px; /* Green */border: none;  color: #f0f0f0; font-weight: ;  text-align: center;  text-decoration: none;  display: inline-block;  font-size: 15.5px; padding: 2.7px 4px; margin: 2px 1px; }`;
document.head.appendChild(document.createElement('style')).innerHTML = `* {   box-sizing: border-box;   } .spaceBetweenTablesSpurtsEquity { border: 2px solid #4b4d4e;min-height:500px;height: 500px;overflow-y: scroll;background-color: #32373a; }  .tableColumnForSpurtsUnderlyings {  float: left;   width: 24.9%;   padding: 5px;  border: 2px solid #4b4d4e;height: 320px;overflow-y: scroll;background-color: #32373a;  }   .tableRowForSpurtsUnderlyings:after {   content: "";   display: table;   clear: both;   }    .tableRowClass {   color: #ffffff;   background: #27ae60;   }   .PreOpenMarketClassLoosers{   color: #ffffff;   background: #ea6153;   }  caption {	white-space: nowrap;  text-align: center; color: #ffffff; height: px; padding-top: 0rem; padding-bottom: 0rem;	}	div::-webkit-scrollbar {  width: 2px;}				div::-webkit-scrollbar-track {  background: #f1f1f1; }			div::-webkit-scrollbar-thumb {  background: #888; } 		div::-webkit-scrollbar-thumb:hover {  background: #555; }`;

//document.body.innerHTML +='<style> table, th, td, caption, th span,  th i  {color: white; }   table { width: 100%; }  </style>'
//document.body.innerHTML +='<style> table tr td:nth-child(1) {  width: 120px; background-color: #5c58dd; border-radius: 15px; /* Green */border: none;  color: #f0f0f0; font-weight: ;  text-align: center;  text-decoration: none;  display: inline-block;  font-size: 15.5px; padding: 2.7px 4px; margin: 2px 1px; }</style>'

var myelement = document.createElement("link");
myelement.setAttribute("rel", "stylesheet");
myelement.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
document.head.appendChild(myelement);

//document.body.innerHTML +='<style> table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding: 5px;}th {text-align: left;}</style>'


    var caretUpClassName = 'fa fa-caret-up';
    var caretDownClassName = 'fa fa-caret-down';

    const sort_by = (field, reverse, primer) => {

      const key = primer ?
        function (x) {
          return primer(x[field]);
        } :
        function (x) {
          return x[field];
        };
		
      reverse = !reverse ? 1 : -1;

      return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      };
    };



    function clearArrow() {
      let carets = document.getElementsByClassName('caret');
	 // console.log(carets)
      for (let caret of carets) {
        caret.className = "caret";
      }
    }


   
    function populateTable( tableDataArray, table_id ) {
	    var tbody = document.getElementById(table_id).getElementsByTagName('tbody')[0];
      tbody.innerHTML = '';
	  //console.log(tableDataArray, table_id)
	   
	  var tbodyStrs=''

	  	for( var dataObj=0;  dataObj < tableDataArray.length; dataObj++ ) {
	   //console.log( Object.keys(tableDataArray[dataObj]).length )
	  tbodyStrs = '<tr>'

	  for( var column=0;  column < Object.keys(tableDataArray[dataObj]).length; column++ ) 
	  {
		  tbodyStrs += '<td>'+ (tableDataArray[dataObj]["column"+column]) +'</td>'
	  }
	
	  
	  tbodyStrs += '</tr>'
	   tbody.innerHTML += tbodyStrs;
      }
	  
    }


	function tableSortAndPushData(tableHead,event)
	{
	var clicked_heading_index = tableHead.closest('th').cellIndex
	var clicked_table_id=tableHead.closest("table").id
	
	//console.log("clicked heading index "+ clicked_heading_index  )
	//console.log("clicked table index "+ clicked_table_id )
	
	var table=tableHead.closest("table")
   	var fetchedTableData = [];
	table.tBodies[0].getElementsByTagName('tr').length

	for( var tableRow=0;  tableRow<table.tBodies[0].getElementsByTagName('tr').length; tableRow++ )
	{
	var keysValuesObj={}
	var td=(table.tBodies[0].getElementsByTagName('tr')[tableRow]).getElementsByTagName('td')
	for( var tableData=0;  tableData< td.length; tableData++ )
	{
	if(isNaN(td[tableData].innerText) == false )
	{
	keysValuesObj["column"+tableData] = Number( td[tableData].innerText )
	}
	else
	{
	keysValuesObj["column"+tableData] =  td[tableData].innerText 
	}

	}
	
	fetchedTableData.push(keysValuesObj)
	}
	//console.log(fetchedTableData)
	
	
	
	   let element = event.target;
		//  console.log(element)
      let caret, field, reverse;
      if (element.tagName === 'SPAN') {
        caret = element.getElementsByClassName('caret')[0];
 
      }
      else {
        caret = element;
 
      }
	  
	       field = "column"+clicked_heading_index 
		   
      let iconClassName = caret.className;
      clearArrow();
	 // console.log("cleared carets, iconClassName: " + iconClassName)
      if (iconClassName.includes(caretUpClassName)) {
        caret.className = `caret ${caretDownClassName}`;
        reverse = false;
      } else {
		 caret.className = `caret ${caretUpClassName}`;
        reverse = true;
      }

      fetchedTableData.sort(sort_by(field, reverse));
      populateTable(fetchedTableData, clicked_table_id);
	
	} // tableSortAndPushData() ENDS HERE
	

function addEventListnerInTablesDEL()
{
	

	var allTableInDocument = document.getElementsByTagName('table');
	for (var table of allTableInDocument) {
		//console.log( table.id ) 
	var ths = table.getElementsByTagName('tHead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')
    for (var th of ths) {
	
	
	if ( th.getAttribute('listener') !== 'true') {
    th.setAttribute('listener', 'true');
	
	th.innerHTML = '<span>' + th.innerText +'<i class="caret"></i></span>'
	
      th.addEventListener('click', function (event) {
		tableSortAndPushData(this, event)
      });
	}
	else
	{
		 th.removeEventListener('click', function (event) {
		tableSortAndPushData(this, event)
      });
	  
	      th.setAttribute('listener', 'true');
	
	th.innerHTML = '<span>' + th.innerText +'<i class="caret"></i></span>'
	
      th.addEventListener('click', function (event) {
		tableSortAndPushData(this, event)
      });
	  
	}
    }
	
	}
}


function addEventListnerInTables()
{
	
    clearArrow();
	var allTableInDocument = document.getElementsByTagName('table');
	for (var table of allTableInDocument) {
		table.getElementsByTagName('caption')[0].setAttribute('onclick', 'copyList(this)');
		table.getElementsByTagName('caption')[0].setAttribute('oncontextmenu', 'copyTable(this); return false;');
		//console.log( table.id ) 
	var ths = table.getElementsByTagName('tHead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')
    for (var th of ths) {
	th.innerHTML = '<span>' + th.innerText +'<i class="caret"></i></span>'
	th.setAttribute('onclick', 'tableSortAndPushData(this, event)')
	}
	}
	
	//setTimeout(function() {  clickOnVolumeAutomatically(); }, 1000);
	clickOnVolumeAutomatically(); 
}

addEventListnerInTables()

function copyList(caption)
{
	var tempStr=''
	var clicked_table_id=caption.closest("table").id
	tempStr="NSE:"+caption.innerHTML.replace(/ /g,"_").replace(/\(/g,"").replace(/\)/g,"").replace(/\%/g,"").replace(/\-/g,"")+"," 
	
	var tablerows=document.getElementById(clicked_table_id).getElementsByTagName('tbody')[0].getElementsByTagName('tr')
	for ( var tr=0; tr < tablerows.length; tr++ )
	//for ( var tr=0; tr < 25; tr++ )
	{
		tempStr +="NSE:"+ tablerows[tr].getElementsByTagName('td')[0].innerText.replace(/-/g,'_').replace(/&amp;/g,'_').replace(/&/g,'_') +"," 
		//console.log(tablerows[tr].getElementsByTagName('td')[0])
	}
	
	
	 navigator.clipboard.writeText(tempStr);

}

function copyTable(caption)
{
	var tempStr=''
	//var clicked_table_id=caption.closest("table").id
	var clicked_table_id=caption.closest("table").innerText
	/*
	var tablerows=document.getElementById(clicked_table_id).getElementsByTagName('tbody')[0].getElementsByTagName('tr')
	for ( var tr=0; tr < tablerows.length; tr++ )
	{
		tempStr +="NSE:"+ tablerows[tr].getElementsByTagName('td')[0].innerText.replace(/-/g,'_').replace(/&amp;/g,'_').replace(/&/g,'_') +"," 
		//console.log(tablerows[tr].getElementsByTagName('td')[0])
	}
	*/
	
	 navigator.clipboard.writeText(clicked_table_id);

}

function clickOnVolumeAutomatically()
{
	var allTableInDocument = document.getElementsByTagName('table');
	
	for (var table of allTableInDocument) {
		var tableId = table.id;
	var ths = table.getElementsByTagName('tHead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')
    for (var th of ths) {
		if( tableId=='stockOptionsTable' || tableId=='stockFuturesTable' || tableId=='mostActiveUnderlyingTable' || tableId=='mostActiveFutureContractsTable' ) 
		{
		if( th.innerText.includes('Volume') )
		{
			th.click()
		}
		}
		
		if( tableId=='SpurtsOIUnderlyingsPreviousDifference' ) 
		{
		if( th.innerText.includes('Chng (%)') )
		{
			th.click()
		}
		}
		
		if( th.innerText.includes('TO Spike')==true || th.innerText.includes('V. Spike') )
		{
			th.click()
		}
		
		if( th.innerText.includes('Flat') )
		{
			th.click()
			th.click()
		}
		
		if( th.innerText.includes('NearH') )
		{
			th.click()
			th.click()
		}
		
		if( th.innerText.includes('NearL') )
		{
			th.click()
			th.click()
		}
		
		if( th.innerText.includes('NearHL') )
		{
			th.click()
			th.click()
		}
		
		if( th.innerText.includes('N.R.P.') )
		{
			th.click()
			th.click()
		}
		

		if( tableId=='onlySpurtsOIUnderlyingsTableStr' ) 
		{
		if( th.innerText.includes('TO/OI') )
		{
			th.click()
		}
		}
		
		if( tableId=='onlyEquityTableStr' ) 
		{
		//if( th.innerText.includes('T.O.') )
		if( th.innerText=='Rank2' )
		{
			th.click()
		}
		}
		
		
		if( th.innerText=='Money' )
		{
			th.click()
		}
		
		if( tableId !='onlyEquityTableStr' && window.location.href.toLocaleLowerCase().includes('momentumspike')==false ) 
		{
		//if( th.innerText.includes('T.O.') )
		if( th.innerText=='20DAV' )
		{
			th.click()
		}
		}	
		
		if( window.location.href.toLocaleLowerCase().includes('premarket')==true ) 
		{
		if( th.innerText=='TO' )
		{
			th.click()
		}
		}
		
		if( window.location.href.toLocaleLowerCase().includes('momentumspike')==true ) 
		{
		if( th.innerText=='Spike' )
		{
			th.click()
		}
		}
		
		
		
		
	}
	}
}

 
 //<!-- General Table Sorting and Pushing Data into Tables Code ENDS HERE -->
