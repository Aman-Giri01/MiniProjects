const status = (result, element) => {
    let category = '';
    let color = '';

    if (result < 18.5) {
        category = 'Underweight';
        color = '#007bff';
    } else if (result < 24.9) {
        category = 'Normal';
        color = '#00ff2a';
    } else if (result < 29.9) {
        category = 'Overweight';
        color = 'orange';
    } else {
        category = 'Obesity';
        color = 'red';
    }

    element.style.color = color; 
    return category;
};

document.getElementById("formdata").addEventListener('submit', (event) => {
    event.preventDefault();

    const formdata = new FormData(event.target);
    let weight = parseFloat(formdata.get('weight'));
    let height = parseFloat(formdata.get('height'));
    const result = document.getElementById('result');

    if (!weight || !height || height <= 0) {
        result.innerHTML = 'Please enter valid weight and height.';
        result.style.color = 'white'; 
        return;
    }

    let h = (height / 100) ** 2;
    const res = (weight / h).toFixed(2);
    
    result.innerHTML = `${res} - ${status(res, result)}`;
});
