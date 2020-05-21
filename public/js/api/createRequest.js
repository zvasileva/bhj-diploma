/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const method = options.method;

    

    if (method === 'GET') {

        const xhr = new XMLHttpRequest;

        let data = '?';
        let url = options.url;

        for (let i in options.data) {
            data = data + i + '=' + options.data[i] + '&';
        }

        url = url + data;

        url = url.slice(0,-1);

        try {
          xhr.open( 'GET', url );

          xhr.responseType = "json";
  
          xhr.setRequestHeader('Content-Type','application/json');
  
          xhr.withCredentials = true;
  
          xhr.send();   
          
          xhr.addEventListener('readystatechange', function() {
              if (xhr.readyState != 4) {
                return
              }
              if (xhr.readyState === xhr.DONE && xhr.status === 200) {  
                options.callback('', this.response); 
              } else {
                options.callback(this.response, '');            
              }
            } )
        }
        catch ( e ) {
          // перехват сетевой ошибки
          options.callback( e );
        }           
        
        return xhr;

    } else {
        const xhr = new XMLHttpRequest;
        const formData = new FormData;

        for (let i in options.data) {
            formData.append( i, options.data[i] );
        }   
        
        try {
          xhr.open( 'POST', options.url );
          xhr.responseType = "json";
  
          xhr.addEventListener('readystatechange', function() {

            
            if (xhr.readyState === xhr.DONE && xhr.status === 200) { 
              if (this.response.success) {
                options.callback('', this.response);
              }

            }
          } 
        )      
            
          xhr.withCredentials = true;
  
          xhr.send( formData ); 
          
          //return xhr;
        }
        catch ( e ) {
          // перехват сетевой ошибки
          options.callback( e );
        }            
      
        
    }

};
