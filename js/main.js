'use strict';

const toggleDivElem = document.querySelector('.toggle_div');
const searchDivElem = document.querySelector('.search_div');
const typeInputElm = document.querySelectorAll('._search');
const adult_down_elm = document.querySelector('._adult_drop_down');
const economy_drop_elm = document.querySelector('._economy_drop_down');
const adult_elem = document.querySelectorAll('._ad_drop');
const ec_elm = document.querySelectorAll('._ad_ec');
const ckButtons = document.querySelectorAll('.ck_btn');
const formDivElem = document.querySelectorAll('.form_div');
const filterButton = document.querySelector('.fl_div');
const filterDiv = document.querySelector('.filter_div');
const renderDomElem = document.querySelector('.render_div');
const addExtraForm = document.querySelector('.add_btn');

let _dr_menu = document.querySelectorAll('._dr_menu');
const cl_btns = document.querySelectorAll('.cl_btns');
const overLayDiv = document.querySelectorAll('.over-lay_div');
const c_1 = document.querySelectorAll('.c1');
const c_2 = document.querySelectorAll('.c2');
const plusHandler = document.querySelectorAll('.plus_hander');
const ecom_div_elem = document.querySelectorAll(
   '._economy_drop_down ._adult_list_div'
);

let removeElemButton;

let formCount = 0;

ckButtons.forEach((el) => {
   el.addEventListener('change', function (e) {
      const target = e.target;
      const dataTab = target.getAttribute('data-tab');
      const domElm = document.querySelector(`#${dataTab}_section`);
      formDivElem.forEach((el) => {
         el.classList.add('_hidden');
      });
      domElm.classList.remove('_hidden');
   });
});

const toggleClassHandler = function (elem, cl) {
   const isClassExists = elem.classList.contains(cl);
   if (!isClassExists) elem.classList.add(cl);
   else elem.classList.remove(cl);
};

filterButton.addEventListener('click', function () {
   toggleClassHandler(filterDiv, 'filter_div_show');
});

adult_elem.forEach((el) => {
   el.addEventListener('click', function (event) {
      c_2.forEach((el) => {
         el.classList.add('_un_');
      });
      const id = event.target.id;
      const elem = document.querySelector(`.${id}_section`);
      toggleClassHandler(elem, '_un_');
   });
});

// overLayDiv.forEach((el) => {
//    el.addEventListener('click', function (event) {
//       const id = event.target.id;
//       const elem = document.querySelector(`.${id}_section`);
//       elem.classList.add('_un_');
//    });
// });

// overLayDiv.addEventListener('click', function (event) {

// });

// adult_elem.forEach((el) => {
//    el.addEventListener('blur', function (event) {
//       const id = event.target.id;
//       const elem = document.querySelector(`.${id}_section`);
//       toggleClassHandler(elem, '_un_');
//    });
// });

ec_elm.forEach((el) => {
   el.addEventListener('click', function (event) {
      c_1.forEach((el) => {
         el.classList.add('_un_');
      });
      const id = event.target.id;
      const elem = document.querySelector(`.${id}_section`);
      toggleClassHandler(elem, '_un_');
   });
});

// ec_elm.forEach((el) => {
//    el.addEventListener('focus', function (event) {
//       const id = event.target.id;
//       const elem = document.querySelector(`.${id}_section`);
//       toggleClassHandler(elem, '_un_');
//    });
// });

toggleDivElem.addEventListener('click', function () {
   toggleClassHandler(searchDivElem, '_show_tabs');
});

typeInputElm.forEach((el) => {
   el.addEventListener('focus', function (elem) {
      const parent = elem.target.parentNode;
      parent.classList.add('show_search_drop_down');
   });
});

typeInputElm.forEach((el) => {
   el.addEventListener('blur', function (elem) {
      const parent = elem.target.parentNode;
      parent.classList.remove('show_search_drop_down');
   });
});

const MONTH_NAMES = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
];
const MONTH_SHORT_NAMES = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function app() {
   return {
      showDatepicker: false,
      datepickerValue: '',
      selectedDate: '2021-02-04',
      dateFormat: 'DD-MM-YYYY',
      month: '',
      year: '',
      no_of_days: [],
      blankdays: [],
      initDate() {
         let today;
         if (this.selectedDate) {
            today = new Date(Date.parse(this.selectedDate));
         } else {
            today = new Date();
         }
         this.month = today.getMonth();
         this.year = today.getFullYear();
         this.datepickerValue = this.formatDateForDisplay(today);
      },
      formatDateForDisplay(date) {
         let formattedDay = DAYS[date.getDay()];
         let formattedDate = ('0' + date.getDate()).slice(-2); // appends 0 (zero) in single digit date
         let formattedMonth = MONTH_NAMES[date.getMonth()];
         let formattedMonthShortName = MONTH_SHORT_NAMES[date.getMonth()];
         let formattedMonthInNumber = (
            '0' +
            (parseInt(date.getMonth()) + 1)
         ).slice(-2);
         let formattedYear = date.getFullYear();
         if (this.dateFormat === 'DD-MM-YYYY') {
            return `${formattedDate}-${formattedMonthInNumber}-${formattedYear}`; // 02-04-2021
         }
         if (this.dateFormat === 'YYYY-MM-DD') {
            return `${formattedYear}-${formattedMonthInNumber}-${formattedDate}`; // 2021-04-02
         }
         if (this.dateFormat === 'D d M, Y') {
            return `${formattedDay} ${formattedDate} ${formattedMonthShortName} ${formattedYear}`; // Tue 02 Mar 2021
         }
         return `${formattedDay} ${formattedDate} ${formattedMonth} ${formattedYear}`;
      },
      isSelectedDate(date) {
         const d = new Date(this.year, this.month, date);
         return this.datepickerValue === this.formatDateForDisplay(d)
            ? true
            : false;
      },
      isToday(date) {
         const today = new Date();
         const d = new Date(this.year, this.month, date);
         return today.toDateString() === d.toDateString() ? true : false;
      },
      getDateValue(date) {
         let selectedDate = new Date(this.year, this.month, date);
         this.datepickerValue = this.formatDateForDisplay(selectedDate);
         // this.$refs.date.value = selectedDate.getFullYear() + "-" + ('0' + formattedMonthInNumber).slice(-2) + "-" + ('0' + selectedDate.getDate()).slice(-2);
         this.isSelectedDate(date);
         this.showDatepicker = false;
      },
      getNoOfDays() {
         let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
         // find where to start calendar day of week
         let dayOfWeek = new Date(this.year, this.month).getDay();
         let blankdaysArray = [];
         for (var i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
         }
         let daysArray = [];
         for (var i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
         }
         this.blankdays = blankdaysArray;
         this.no_of_days = daysArray;
      },
   };
}

const insertElem = function () {
   formCount++;
   const html = ` <div class="row mt-4 cl_div"  id="_form_elem_insert_${formCount}">
   <div class="col-12">
       <h4 class="mb-3">Trip</h4>
   </div>
   <div class="col-12 col-lg-4 col-xl-4">
       <div class="input_div">
           <p class="mb-1 ms-2">From</p>
           <div class="_input_el">
               <div class="_in_div">
                   <div class="me-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                           fill="currentColor" viewBox="0 0 256 256" data-testid="originIcon">
                           <rect width="256" height="256" fill="none"></rect>
                           <line x1="24" y1="216" x2="168" y2="216" fill="none"
                               stroke="currentColor" stroke-linecap="round"
                               stroke-linejoin="round" stroke-width="12"></line>
                           <path
                               d="M16.9,140.4l37.7,35.3a32,32,0,0,0,38,4.3L244,92,225.4,69.2a32,32,0,0,0-41-7.3L140,88,80,68,63.5,75.1a8,8,0,0,0-2.2,13.3L92,116,64,132,36,120l-16.8,7.2A8,8,0,0,0,16.9,140.4Z"
                               fill="none" stroke="currentColor" stroke-linecap="round"
                               stroke-linejoin="round" stroke-width="12"></path>
                       </svg>
                   </div>
                   <input type="text" placeholder="From" class="_search">
                   <div class="clear_icon _hidden">
                       <i class="fas fa-times cl_btn"></i>
                   </div>
                   <div class="search_input_result _hidden">
                       <div class="inital_div">
                           <p class="mb-0">Enter at last 2 characters to search</p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
   <div class="col-12 col-lg-4 col-xl-4">
       <div class="input_div">
           <p class="mb-1 ms-2">To</p>
           <div class="_input_el">
               <div class="_in_div">
                   <div class="me-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                           fill="currentColor" viewBox="0 0 256 256"
                           data-testid="destinationIcon">
                           <rect width="256" height="256" fill="none"></rect>
                           <line x1="96" y1="216" x2="240" y2="216" fill="none"
                               stroke="currentColor" stroke-linecap="round"
                               stroke-linejoin="round" stroke-width="12"></line>
                           <path
                               d="M24,103.7V51.1a8,8,0,0,1,10.5-7.6L48,48,64,78,96,88V51.1a8,8,0,0,1,10.5-7.6L120,48l32,56,48.6,13.5A31.9,31.9,0,0,1,224,148.3V184L47.4,134.5A31.9,31.9,0,0,1,24,103.7Z"
                               fill="none" stroke="currentColor" stroke-linecap="round"
                               stroke-linejoin="round" stroke-width="12"></path>
                       </svg>
                   </div>
                   <input type="text" placeholder="From" class="_search">
                   <div class="clear_icon _hidden">
                       <i class="fas fa-times cl_btn"></i>
                   </div>
                   <div class="search_input_result _hidden">
                       <div class="inital_div">
                           <p class="mb-0">Enter at last 2 characters to search</p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
   <div class="col-12 col-lg-4 col-xl-4">
       <div class="_input_div ">
           <p class="ms-2 mb-1">Depart</p>
           <div class="_drop_input_div" x-data="app()" x-init="[initDate(), getNoOfDays()]"
               x-cloak>
               <div class="container mx-auto px-4 py-2 md:py-10">
                   <div class="relative">
                       <input type="hidden" name="date" x-ref="date"
                           :value="datepickerValue" />
                       <input type="text" x-on:click="showDatepicker = !showDatepicker"
                           x-model="datepickerValue"
                           x-on:keydown.escape="showDatepicker = false"
                           class="focus:outline-none" placeholder="Select date" readonly />
                       <div class="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 timer"
                           x-show.transition="showDatepicker"
                           @click.away="showDatepicker = false">
                           <div class="flex justify-between items-center mb-2">
                               <div>
                                   <span x-text="MONTH_NAMES[month]"
                                       class="text-lg font-bold text-gray-800"></span>
                                   <span x-text="year"
                                       class="ml-1 text-lg text-gray-600 font-normal"></span>
                               </div>
                               <div>
                                   <button type="button"
                                       class="focus:outline-none focus:shadow-outline transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 p-1 rounded-full"
                                       @click="if (month == 0) {
                                                             year--;
                                                             month = 12;
                                                         } month--; getNoOfDays()">
                                       <svg class="h-6 w-6 text-gray-400 inline-flex"
                                           fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor">
                                           <path stroke-linecap="round" stroke-linejoin="round"
                                               stroke-width="2" d="M15 19l-7-7 7-7" />
                                       </svg>
                                   </button>
                                   <button type="button"
                                       class="focus:outline-none focus:shadow-outline transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 p-1 rounded-full"
                                       @click="if (month == 11) {
                                                             month = 0; 
                                                             year++;
                                                         } else {
                                                             month++; 
                                                         } getNoOfDays()">
                                       <svg class="h-6 w-6 text-gray-400 inline-flex"
                                           fill="none" viewBox="0 0 24 24"
                                           stroke="currentColor">
                                           <path stroke-linecap="round" stroke-linejoin="round"
                                               stroke-width="2" d="M9 5l7 7-7 7" />
                                       </svg>
                                   </button>
                               </div>
                           </div>

                           <div class="flex flex-wrap mb-3 -mx-1">
                               <template x-for="(day, index) in DAYS" :key="index">
                                   <div style="width: 14.26%" class="px-0.5">
                                       <div x-text="day"
                                           class="text-gray-800 font-medium text-center text-xs">
                                       </div>
                                   </div>
                               </template>
                           </div>

                           <div class="flex flex-wrap -mx-1">
                               <template x-for="blankday in blankdays">
                                   <div style="width: 14.28%"
                                       class="text-center p-1 border-transparent text-sm">
                                   </div>
                               </template>
                               <template x-for="(date, dateIndex) in no_of_days"
                                   :key="dateIndex">
                                   <div style="width: 14.28%" class="px-1 mb-1">
                                       <div @click="getDateValue(date)" x-text="date"
                                           class="cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100"
                                           :class="{
                                   'bg-indigo-200': isToday(date) == true, 
                                   'text-gray-600 hover:bg-indigo-200': isToday(date) == false && isSelectedDate(date) == false,
                                   'bg-indigo-500 text-white hover:bg-opacity-75': isSelectedDate(date) == true 
                                 }"></div>
                                   </div>
                               </template>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
   <div class="close_btn_elem" data-count='${formCount}' onclick="removeDomElemeFn(this)">
       <i class="fas fa-times"></i>
   </div>
</div>`;

   const addExtraForm = document.querySelector('.add_btn');

   renderDomElem.insertAdjacentHTML('beforebegin', html);
   removeElemButton = document.querySelectorAll('.close_btn_elem');

   if (formCount >= 3) {
      addExtraForm.remove();
   }
};

const addDomElem = function () {
   addExtraForm.addEventListener('click', function () {
      insertElem();
   });
};

addDomElem();

const removeDomElemeFn = function (event) {
   const count = +event.getAttribute('data-count');
   const elem = document.querySelector(`#_form_elem_insert_${count}`);
   formCount--;

   const btnRenderDiv = document.querySelector('.ren_op');
   const addExtraForm = document.querySelector('.add_btn');

   if (formCount === 0 && !addExtraForm) {
      const html = `<div class="row">
      <div class="col-12 btn_group_div" >
          <button data-testid="searchForm-searchFlights-button" onclick='insertElem()'
              class="_search_btn add_btn mt-3" type="submit"><span
                  class="_btn_heading_el">Add</span></button>
      </div>
  </div>`;
      btnRenderDiv.insertAdjacentHTML('beforebegin', html);
   }

   elem.remove();
};

cl_btns.forEach((el) => {
   el.addEventListener('click', function (event) {
      cl_btns.forEach((el) => {
         el.classList.remove('active_btn');
      });
      event.target.classList.add('active_btn');
   });
});

class PriceRange extends HTMLElement {
   constructor() {
      super();

      console.log('Price Range: Constructor', this);
   }

   connectedCallback() {
      // Elements
      this.elements = {
         container: this.querySelector('div'),
         track: this.querySelector('div > div'),
         from: this.querySelector('input:first-of-type'),
         to: this.querySelector('input:last-of-type'),
         output: this.querySelector('output'),
      };

      // Event listeners
      this.elements.from.addEventListener('input', this.handleInput.bind(this));
      this.elements.to.addEventListener('input', this.handleInput.bind(this));

      // Properties
      this.currency =
         this.hasAttribute('currency') &&
         this.getAttribute('currency') !== undefined &&
         this.getAttribute('currency') !== ''
            ? this.getAttribute('currency')
            : '£';

      // Update the DOM
      this.updateDom();

      console.log('Price Range: Connected', this);
   }

   disconnectedCallback() {
      delete this.elements;
      delete this.currency;

      console.log('Price Range: Disconnected', this);
   }

   get from() {
      return parseInt(this.elements.from.value);
   }
   get to() {
      return parseInt(this.elements.to.value);
   }

   handleInput(event) {
      if (
         parseInt(this.elements.to.value) -
            parseInt(this.elements.from.value) <=
         1
      ) {
         if (event.target === this.elements.from) {
            this.elements.from.value = parseInt(this.elements.to.value) - 1;
         } else if (event.target === this.elements.to) {
            this.elements.to.value = parseInt(this.elements.from.value) + 1;
         }
      }

      // Update the DOM
      this.updateDom();

      console.log('Price Range: Updated!!', {
         from: parseInt(this.elements.from.value),
         to: parseInt(this.elements.to.value),
      });
   }

   updateDom() {
      this.drawFill();
      this.drawOutput();
   }

   drawFill() {
      const percent1 =
            (this.elements.from.value / this.elements.from.max) * 100,
         percent2 = (this.elements.to.value / this.elements.to.max) * 100;

      this.elements.track.style.background = `linear-gradient(to right, var(--track-color) ${percent1}%, var(--track-highlight-color) ${percent1}%, var(--track-highlight-color) ${percent2}%, var(--track-color) ${percent2}%)`;
   }

   drawOutput() {
      this.elements.output.innerHTML = `
         <div>
         ${this.currency}${this.elements.from.value}
         </div>
         <div>
         ${this.currency}${this.elements.to.value}
         </div>
      `;
   }
}

customElements.define('price-range', PriceRange);

plusHandler.forEach((el) => {
   el.addEventListener('click', function (event) {
      const id = event.target.id;
      const elem = document.querySelector(`.${id}_elem`);
      let num_value = Number(elem.textContent);
      num_value++;
      elem.textContent = num_value;
   });
});

const showAndHideTab = function (event) {
   event.classList.toggle('mg_show');
};

ecom_div_elem.forEach((el) => {
   el.addEventListener('click', function (event) {
      ecom_div_elem.forEach((el) => el.classList.remove('_active'));

      event.target.classList.add('_active');
   });
});
