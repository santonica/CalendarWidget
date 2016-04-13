

var createCalendarWidget;

(function(){


    "use strict";

    createCalendarWidget = function(chosenDay, chosenMonth, chosenYear) {

        var dt;
        var dateStr;
        var TOTALCELLS=42;
        
        function getLastDay(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }

        function getStartDay(month, year) {
            return new Date(year, month, 1).getDay();
        }
        
        function createCalendar() {

            var calBody = document.getElementById("calBody");
            var calendarCells = calBody.getElementsByTagName("td");
            var count = 1;
            if(!chosenDay || !chosenMonth || !chosenYear) {
                dt = new Date();
                chosenDay = dt.getDate();
                chosenMonth = dt.getMonth();
                chosenYear = dt.getFullYear();
            }
            else {
                dt = new Date(chosenYear, chosenMonth, chosenDay);
            }
            var dateStr="";
            var startDay = getStartDay(chosenMonth, chosenYear);
            var dayCount = getLastDay(chosenMonth, chosenYear);

            console.log(startDay + " " + dayCount);
            if (startDay > 0) fillPreviousMonthDays(calendarCells, chosenMonth, chosenYear);

            var index = startDay;
            for (var i=0; i < dayCount; i++) {
                calendarCells[index].className = "calday";
                if(chosenDay === (i+1)) {
                    calendarCells[index].className = " caldayselected";
                }
                var dateStr = (chosenMonth+1)+"/"+(i+1)+"/" + chosenYear;
                calendarCells[index].innerHTML ="<a href='#' data-dt='"+ dateStr +"'>" + (i+1) + "</a>";
                calendarCells[index++].addEventListener("click", function(e) {
                    if (e.target) {
                        setDateSelection(e.target.dataset.dt);
                    }
                });
            }
            var nextMonthDay=1;
            for(var i=index; i < TOTALCELLS ;i++) {
                dateStr = (chosenMonth+2)+"/"+nextMonthDay+"/" + chosenYear;
                calendarCells[i].className = "caldaybleed";
                calendarCells[i].innerHTML ="<a href='#' data-dt='"+ dateStr +"'>" + (nextMonthDay++) + "</a>";
                calendarCells[i].addEventListener("click", function(e) {
                    if (e.target) {
                        setDateSelection(e.target.dataset.dt);
                    }
                });
            }


        }

        function fillPreviousMonthDays(calendarCells, chosenMonth, chosenYear) {
            //find previous month and last day of that month
            var lastDay = getLastDay(chosenMonth-1, chosenYear);
            var startDay = getStartDay(chosenMonth, chosenYear);
            for(var i=startDay;i > 0 ;i--) {
                var dateStr = (chosenMonth) + "/"+lastDay+"/" + chosenYear;
                calendarCells[i-1].className = "caldaybleed";
                calendarCells[i-1].innerHTML ="<a href='#' data-dt='"+ dateStr +"'>" + (lastDay--) + "</a>";
                calendarCells[i-1].addEventListener("click", function(e) {
                    if (e.target) {
                        setDateSelection(e.target.dataset.dt);
                    }
                });
            }
        }

        function setDateSelection(dateStr) {
            document.getElementById("selDate").value = dateStr;
            close();
        }

        function render() {
            var calendarDiv = document.getElementById("calendarDiv");
            var calendarHeader = document.getElementById("calheader");
            var calendarContent = document.getElementById("calcontent");
            var calendarSel = document.getElementsByClassName("calSelection");
            createCalendar();
            calendarSel[0].innerHTML = dt.toDateString();

        }

        function close() {
            var calendarDiv = document.getElementById("calendarDiv");
            calendarDiv.style.display="none";
        }

        return {
            render: render,
            getCalendar: function () {
                return calendar;
            },
            setDateString:function(dateStr) {
                if(dateStr) {
                    try{
                        var existingDate = new Date(dateStr);
                        chosenDay = existingDate.getDate();
                        chosenMonth = existingDate.getMonth();
                        chosenYear = existingDate.getFullYear();    
                    }
                    catch(e) {
                        console.log("Error! Invalid date entered!");
                    }
                    
                }            
            }
        };

    };
    
}());
