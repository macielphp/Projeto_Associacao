export default function validaDatas() {
    const dataDoacaoInput = document.getElementById('data_doacao_entrada');
    const dataValidadeInput = document.getElementById('data_validade_entrada');

    if (dataDoacaoInput) {
        dataDoacaoInput.addEventListener('input', function () {
            validaDataDoacao(this);
        });
    }

    if (dataValidadeInput) {
        dataValidadeInput.addEventListener('input', function () {
            validaDataValidade(this, dataDoacaoInput.value);
        });
    }
}

function validaDataDoacao(campo) {
    const data = campo.value;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0) // Define a hora para 00:00:00 para evitar problemas de horário
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!regexData.test(data)) {
        campo.setCustomValidity('Formato de data inválido. Use dd/mm/yyyy.');
    } else {
        const [dia, mes, ano] = data.split('/');
        const dataDoacao = new Date(`${ano}-${mes}-${dia}`);
        dataDoacao.setHours(0, 0, 0, 0); // Define a hora para 00:00:00

        if (dataDoacao < hoje) {
            campo.setCustomValidity('A data deve ser a atual.');
        } else {
            campo.setCustomValidity('');
        }
    }
    campo.reportValidity();
}

function validaDataValidade(campo, dataDoacao) {
    const data = campo.value;
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!regexData.test(data)) {
        campo.setCustomValidity('Formato de data inválido. Use dd/mm/yyyy.');
    } else {
        const [dia, mes, ano] = data.split('/');
        const dataValidade = new Date(`${ano}-${mes}-${dia}`);
        dataValidade.setHours(0, 0, 0, 0); // Define a hora para 00:00:00

        if (dataDoacao) {
            const [diaDoacao, mesDoacao, anoDoacao] = dataDoacao.split('/');
            const dataDoacaoConvertida = new Date(`${anoDoacao}-${mesDoacao}-${diaDoacao}`);
            const dataMinValidade = new Date(dataDoacaoConvertida);
            dataMinValidade.setDate(dataMinValidade.getDate() + 3);

            if (dataValidade <= dataMinValidade) {
                campo.setCustomValidity('A data de validade deve ser superior a 3 dias após a data de doação.');
            } else {
                campo.setCustomValidity('');
            }
        }
    }
    campo.reportValidity();
}
