import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordRef = useRef(null)

  const passswordGenerator = useCallback(() => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const number = '0123456789'
    const specialChar = '!@#$%^&*-()_+=[]{}`~|;:,.<>?'
    let password = ''
    let charSet = charset

    if (numberAllowed) {
      charSet += number
    }
    if (charAllowed) {
      charSet += specialChar
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length)
      password += charSet[randomIndex]
    }

    setPassword(password) 
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 101);
      window.navigator.clipboard.writeText(password);

    
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    }
  }, [password]);

  useEffect(() => {passswordGenerator()}, [length, numberAllowed, charAllowed, passswordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center mb-4'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-2 px-3"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`outline-none px-3 py-0.5 shrink-0 ${
              isCopied ? 'bg-green-600' : 'bg-blue-700'
            } text-white transition-colors duration-300`}
          >
            {isCopied ? 'Copied!' : 'Copy'}</button>
          
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {setNumberAllowed((prev) => !prev);   
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
            </div>  
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {setCharAllowed((prev) => !prev);   
            }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
