
import request from '@/libs/request'

/*
** 附件上传相关api
*/ 
export const fileApi = {
    upLoadFile : data => {
        return request({
            url: `/file/upLoad`,
            data,
            method: 'post'
        });
    },
    deleteFile : params => {
        return request({
            url: `/file/delete`,
            params,
            method: 'get'
        });
    },
    getFile : params => {
        return request({
            url: `/file/get`,
            params,
            method: 'get',
            responseType: 'blob'
        });
    },
    
}






