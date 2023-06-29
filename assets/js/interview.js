const results = document.querySelectorAll('#interview select.result');
for (let result of results) {
    result.addEventListener('change', (e) => {
        let id = e.target.getAttribute('id');
        let value = e.target.value;
        window.location.href = `/update/${id}/${value}`;
       
    })
}