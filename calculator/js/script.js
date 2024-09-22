const operation = document.getElementById('operation-select')

    operation.addEventListener('change', function handleChange(event) {
        //chosen operation
        box.innerHTML = 'You selected '.concat(operation.value);

        //hide all elements except chosen one
        var elems = document.querySelectorAll(
          '#numbersActions, #numbersNegation, #stringsAddition, #arraysAddition'
        )
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.display = 'none'
        }
        
        if (this.selectedIndex === 0 || this.selectedIndex === 1 || this.selectedIndex === 2 || this.selectedIndex === 3) {
            document.querySelector('#numbersActions').style.display = 'block'
        }
        if (this.selectedIndex === 4) {
            document.querySelector('#numbersNegation').style.display = 'block'
        }
        if (this.selectedIndex === 5) {
            document.querySelector('#stringsAddition').style.display = 'block'
        }
        if (this.selectedIndex === 6) {
            document.querySelector('#arraysAddition').style.display = 'block'
        }
    })

    calculator.onclick = function(){
        //get values from text fields
      const operation = document.getElementById('operation-select')
      if (operation.value === '+' || operation.value === '-' || operation.value === '*' || operation.value === '/') {
        var value1 = numberValidator(document.getElementById('value1').value)
        var value2 = numberValidator(document.getElementById('value2').value)  
        var result = makeCalculation(value1, value2, operation.value)
      } else if (operation.value === 'negation') {
        var value1 = booleanValidate(document.getElementById('value3').value) 
        var value2 = numberValidator(document.getElementById('value4').value)
        var result = -Number(value2)
      }  else if (operation.value === 'stringAddition') {
        var result = document.getElementById('value5').value + document.getElementById('value6').value
      } else if (operation.value === 'arraysAddition') {
        //validate first
        var value1 = arraysForAdditionValidation(document.getElementById('value7').value)
        var value2 = arraysForAdditionValidation(document.getElementById('value8').value)
        value1 = document.getElementById('value7').value.split(',')
        value2 = document.getElementById('value8').value.split(',')               
        var result = AdditionArrays(value1, value2)
      }
         
      var resultObj = document.getElementById("result");
      resultObj.value = result
      resultObj.style.display = 'block'
    }

    function AdditionArrays(value1, value2) {
      var result = [];
      if (value1.length !== value2.length) {
        throw new Error("Something went badly wrong!");
      } else {
          for (let i = 0; i < value1.length; i++) {
            result.push(Number(value1[i]) + Number(value2[i]))
          }
      }
      return result
    }

    function arraysForAdditionValidation(value) {
      var regex = /^(-?\d{1,3}(,\d{3})*(\.\d+)?|\d+(\.\d+)?)/
      if (!value.match(regex)) {
        throw new Error("Something went badly wrong!");
      } else {
        return value
      }
    }

    function numberValidator(value) {
      var regex = /^(-?\d+)(,?\d+)*(\.\d+(e\d+)?)?$/
      if (!value.match(regex)) {
        //show error in console & stop
        throw new Error("Something went badly wrong!");
      } else {
        return value
      }
    }

    function booleanValidate(value) {
      if (value === 'true' || value === 'false') {
        return value
      } else {
        throw new Error("Something went badly wrong!");
      }
    }

    function makeCalculation(value1, value2, action) {
      var result = ''
      switch (action) {
        case "+":
          result = Number(value1) + Number(value2)
          break;
        case "-":
          result = Number(value1) - Number(value2)
          break;
        case "*":
          result = Number(value1) * Number(value2)
          break;    
        case "/":
          result = Number(value1) / Number(value2)
          break;                      
        default:
          result = ''
          break;
      }
      return result
    }