//<!-- Common Functions Code for all pages Starts Here -->

function saveSelectedValues()
{

	var selectedMonthYear = document.getElementById('monthYear').value
	var selectedTradingDate = document.getElementById('tradingDate').value
	var selectedCommonTimeValues = document.getElementById('commonTimeValues').value
	var selectedValuesObj = {
	"selectedMonthYear":selectedMonthYear,
	"selectedTradingDate": selectedTradingDate,
	"selectedCommonTimeValues":selectedCommonTimeValues,
	}
	localStorage.setItem( 'selectedValues', JSON.stringify(selectedValuesObj) )

}

function setSavedSelectedTimeValues()
{
	var savedSelectedValues = JSON.parse( localStorage.getItem( 'selectedValues' ) )
	document.getElementById('monthYear').value = savedSelectedValues["selectedMonthYear"]
	document.getElementById('tradingDate').value = savedSelectedValues["selectedTradingDate"]
	
	setCommonSelectors()
	document.getElementById('commonTimeValues').value = savedSelectedValues["selectedCommonTimeValues"]
	
}

function syncTimeValues( syncToTimeValuesArray, syncWith )
{
		//var selectedSymbolTime = document.getElementById("indicesTimeValues").value;
		var syncWithTimeValue = syncWith;
		
		var syncedTimeValue;
		var tempPreviousTime=""
		//for (var timeValue in syncToTimeValues) {
		for (var i=0;i<syncToTimeValuesArray.length;i++) {
		var timeValue = syncToTimeValuesArray[i]
			if( timeToMinutes(timeValue) == timeToMinutes(syncWithTimeValue) )
			{
				syncedTimeValue = timeValue
				/*
				document.getElementById("indices_performance_time").value = timeValue
				  showIndicesPerformanceChart()
				  */
				break
			}
			else if( timeToMinutes(timeValue) > timeToMinutes(syncWithTimeValue) )
			{
				syncedTimeValue = tempPreviousTime
				/*
				document.getElementById("indices_performance_time").value = tempPreviousTime
				 showIndicesPerformanceChart()
				 */
				break
			}
			else
			{
				tempPreviousTime=timeValue
			}
				
		}
		
		
		var previousTimeValue = syncToTimeValuesArray[ syncToTimeValuesArray.indexOf( syncedTimeValue )-1 ]
		
	return [syncedTimeValue, previousTimeValue];


}

function handleTimeValues( passedValue, timeValuesArray, selectElementRef, callBackFunction )
{
// this is common function which handles selectors timeValues. it takes some element references and call-back function references and then handle according to requirement

	var commonTimeValues = document.getElementById("commonTimeValues").value;
	//const selectElementRef = document.getElementById("commonTimeValues");
	selectElementRef.innerHTML = '<option>Select</option>'
  for (let i = 0; i < timeValuesArray.length; i++) {
    var optionElement = document.createElement("option");
    optionElement.text = timeValuesArray[i];
    selectElementRef.add(optionElement);
  }
  
  	if (passedValue=="last")
	{
	var lastValue = selectElementRef.options[selectElementRef.options.length - 1].value;
	selectElementRef.value = lastValue
	//showIndicesPerformanceChart()
	}
	else if (passedValue=="syncWithCommonTime")
	{
		
		var syncedTimeValue = syncTimeValues( timeValuesArray, commonTimeValues )
		selectElementRef.value = syncedTimeValue[0]
		//console.log(commonTimeValues,syncedTimeValue)
		if ( syncedTimeValue !=undefined )
		{
		//showIndicesPerformanceChart()
		callBackFunction()
		}

	}
}

//Time to Minutes
function timeToMinutes(hms) {

	//var hms = '15:24:33';   // your input string
	var a = hms.split(':'); // split it at the colons
	// Hours are worth 60 minutes.
	var minutes = (+a[0]) * 60 + (+a[1]);

	////console.log(minutes + "," + ((+a[2]) / 60));
	return minutes;
}

//Minutes to Time
function minutesToTime(minutes) {

	var format2 = (n) => `0${n / 60 ^ 0}`.slice(-2) + ':' + ('0' + n % 60).slice(-2)
	////console.log(format2(601)) // "00:05"
	//console.log(format2(minutes)) // "00:05"
}


//<!-- Common Functions Code for all pages Ends Here -->
