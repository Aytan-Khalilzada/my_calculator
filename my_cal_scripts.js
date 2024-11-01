let expression = ''; // Store the expression
let count=0;

        // Function to append a character to the expression
        function appendCharacter(char) {
            expression += char;
            count++;
            updateDisplay();
        }

        // Function to update the display with the current expression
        function updateDisplay() {
            if(count>15){
                document.getElementById('expression').innerText = "can not include number with more than 15 digit";
            }else{
                document.getElementById('expression').innerText = expression;
            }
        }

        // Function to clear the display
        function clearDisplay() {
            expression = '';
            count=0;
            document.getElementById('expression').innerText = '';
            document.getElementById('result').innerText = '0';
        }

        // Function to delete the last character
        function deleteLast() {
            expression = expression.trim().slice(0, -1);
            updateDisplay();
        }

        // Function to append a decimal if not already present in the last number
        function appendDecimal() {
            const match = expression.match(/(\d+(\.\d*)?)$/);
            if (match && !match[0].includes('.')) {
                expression += '.';
                updateDisplay();
            }
        }

        // Function to toggle sign
        function toggleSign() {
            const match = expression.match(/(.*?)([+-])(\d*\.?\d+)$/);
            if (match) {
                const beforeOperator = match[1];
                const operator = match[2];
                const lastNumber = match[3];
                const newOperator = operator === '-' ? '+' : '-';
                expression = beforeOperator + newOperator + lastNumber;
                updateDisplay();
            }
        }

        // Function to calculate the result when = is pressed
        function calculateResult() {
            try {
                // Handle percentage calculations by converting "number%number" format
                if (expression.includes('%')) {
                    const [base, percent] = expression.split('%').map(Number);
                    expression = (percent ? base * (percent / 100) : base / 100).toString();
                }
                const result = eval(expression);
                document.getElementById('result').innerText = result;
                expression = result.toString();
            } catch (error) {
                document.getElementById('result').innerText = 'Error';
            }
        }