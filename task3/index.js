let objectInStore = JSON.parse(localStorage.getItem('store'));

let objectState = {};

let checkBoxes = objectInStore?.checkboxes || [];

const countCheckBox = (checkbox, event) => {
  if (event) {
    checkBoxes.push(checkbox.name)
    objectState.checkboxes = [...new Set(checkBoxes)];
  } else {
    checkBoxes = checkBoxes.filter(i => i !== checkbox.name);
    objectState.checkboxes = checkBoxes;
  }

  objectState.inputValue = objectInStore.inputValue;
  objectState.tableData = objectInStore.tableData;

  localStorage.setItem('store', JSON.stringify(objectState));

  document.getElementsByClassName('checkboxes')[0].innerHTML = 'Checkboxes: ' + objectState.checkboxes.length;
}

const sendRequest = () => {
  let xhr = new XMLHttpRequest();

  const inputValue = document.getElementById('input-name').value;

  objectState.inputValue = inputValue;

  xhr.open('GET', `http://universities.hipolabs.com/search?name=${inputValue}`);

  xhr.send();

  xhr.onload = function () {
    let table = '';
    if (xhr.status !== 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      let myObj = JSON.parse(this.responseText);
      table += "<table class='table'>"
      table += "<tr><td>№</td><td>Country</td><td>Name</td><td>Code</td><td>Domains</td><td>Web page</td><td>Save to list?</td></tr>";

      myObj.forEach((el, i) => {
        table +=
          "<tr class='border'>" +
          "<td>" + (i + 1) + "</td>" +
          "<td>" + el['country'] + "</td>" +
          "<td>" + el['name'] + "</td>" +
          "<td>" + el['alpha_two_code'] + "</td>" +
          "<td>" + el['domains'] + "</td>" +
          "<td>" + `<a href="${el['web_pages']}">` + el['web_pages'][0] + "</a></td>" +
          `<td><input type='checkbox' name='${(i + 1)}' onchange='countCheckBox(this, this.checked)'></td>` +
          "</tr>";
      })
      table += "</table>"

      objectState.tableData = table;
      objectState.checkboxes = [];

      objectInStore = objectState;

      localStorage.setItem('store', JSON.stringify(objectState));

      document.getElementById('table').innerHTML = table;
    }
  };

  xhr.onerror = () => {
    alert('error');
  };
}

const setFromStore = () => {
  const _storeObject = JSON.parse(localStorage.getItem('store'));

  document.getElementById('input-name').value = _storeObject.inputValue;
  document.getElementById('table').innerHTML = _storeObject.tableData;
  document.getElementsByClassName('checkboxes')[0].innerHTML = 'Checkboxes: ' + _storeObject.checkboxes.length;

  _storeObject.checkboxes.forEach((c, i) => {
    document.getElementsByName(c)[0].setAttribute('checked', 'true');
  })
}

const reset = () => {
  document.getElementById('input-name').value = '';
  document.getElementById('table').innerHTML = '';
  document.getElementsByClassName('checkboxes')[0].innerHTML = 'Checkboxes: 0'

  localStorage.removeItem('store');
}

(function init() {
  if (localStorage.getItem('store')) {
    setFromStore()
  }
})()
