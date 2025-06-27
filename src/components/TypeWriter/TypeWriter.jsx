
import { Typewriter } from 'react-simple-typewriter'

const TypeWriter = () => {
    return (
    <div className='App'>
      <h1 style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal' }}>
        {' '}
        <span style={{ color: 'Green', fontWeight: 'bold' }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={['Desgin & Developed by Md. Shoaib Ahmed']}
            loop={25}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          
          />
        </span>
      </h1>
    </div>
  )
};

export default TypeWriter;