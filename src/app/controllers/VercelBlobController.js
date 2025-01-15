const {del} = require('@vercel/blob');

async function deleteImgVercelBlob(req, res) {
    try {
        const {imageKey} = req.params;

        // Verifica se o token existe
        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token) {
            console.error('Token de acesso não encontrado');
            return res.status(500).json({
                success: false,
                message: 'Token de acesso não encontrado',
                error: 'BLOB_READ_WRITE_TOKEN não está configurado nas variáveis de ambiente'
            });
        }

        // Verifica se a imageKey foi fornecida
        if (!imageKey) {
            console.error('Image key não fornecida');
            return res.status(400).json({
                success: false,
                message: 'Image key não fornecida',
                error: 'É necessário fornecer a chave da imagem para deleção'
            });
        }

        await del(imageKey, { token })

        return res.status(200).json({
            success: true,
            message: 'Arquivo deletado com sucesso'
        });

    } catch (error) {
        // Trata diferentes tipos de erros
        console.error('Erro ao deletar arquivo:', error);
        let errorMessage = 'Erro desconhecido ao deletar arquivo';
        let statusCode = 500;

        if (error.response?.status === 404) {
            errorMessage = 'Arquivo não encontrado no Vercel Blob';
            statusCode = 404;
        } else if (error.response?.status === 403) {
            errorMessage = 'Token sem permissão para deletar este arquivo';
            statusCode = 403;
        }

        return res.status(statusCode).json({
            success: false,
            message: 'Falha ao deletar arquivo',
            error: errorMessage
        });
    }
}

module.exports = {
    deleteImgVercelBlob
};
