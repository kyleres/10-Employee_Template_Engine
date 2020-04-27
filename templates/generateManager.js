function generateManager(answer) {
    return `
    <div class="column">
        <div class="card mx-3 my-3">
            <div class="card-header bg-danger">
                <h3 class="card-title text-center">${answer.name}</h3>
                <h4 class="card-subtitle text-center">${answer.role}</h2>
            </div>
            <div class="card-body">
                <p><b>ID:</b> ${answer.id}</p>
                <p><b>Email:</b> ${answer.email}</p>
                <p><b>Office Number:</b> ${answer.officeNumber}</p>
            </div>
        </div>
    </div>
`}

module.exports = generateManager;