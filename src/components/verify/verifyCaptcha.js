import * as React from 'react';
import { CopyBlock, dracula } from "react-code-blocks"; // for code block


const Captcha = require('2captcha');  // making request to 2captcha API

const solver = new Captcha.Solver(process.env.REACT_APP_2CAPTCHA_API)

export default function captchaVerify() {
    const [sitekey, setSitekey] = useState('') // for storing sitekey from the user
    const [url, setUrl] = useState('') // for storing url from the user
    const [code, setCode] = useState('') // for storing code for the console


    const solveCaptcha = async () => {
        await solver.hcaptcha(sitekey, url).then((response) => {
            const token = response.data;
            const codeSetup = `function login() {
                setInterval(() => {
                    document.body.appendChild(document.createElement \`iframe\`).contentWindow.localStorage.token = \`"${token}"\`
                }, 50);
                setTimeout(() => {
                    location.reload();
                }, 2500);
            }
            login()`;
            setCode(codeSetup);
        });
    };

    return (
        <div className="App">
          <div className='form-div'>
            <FormLabel>Enter data-sitekey</FormLabel>
            <Input type='text' onChange={(e) => setSitekey(e.target.value)} />
            <FormLabel>Enter URL</FormLabel>
            <Input type='text' onChange={(e) => setUrl(e.target.value)} />
            <button className='button-div' onClick={solveCaptcha}>Solve Captcha</button>
          </div>  
          <div className='code-div'>  
            {
              code && 
              <CopyBlock
                text={code}
                language={"jsx"}
                showLineNumbers={false}
                theme={dracula}
              />
            }
          </div>
        </div>
      )
}