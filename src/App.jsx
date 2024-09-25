import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  
  const [emails, setEmails] = useState(initialEmails)

  const [showUnRead, setShowUnRead] = useState(false)
  const [showStarred, setShowStarred] = useState(false)

  function handleToggleRead(e) {
    e.read = !e.read
    setEmails([...emails]);
  }

  function handleToggleStar(e){
    setEmails(prev =>
      prev.map(email =>
        email.id === e.id ? { ...email, starred: !email.starred } : email
      )
    );
  }

  function getEmails() {
    return emails.filter(e => (!showUnRead || e.read === false) && (!showStarred || e.starred === true));
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <input
              id="hide-starred"
              type="checkbox"
              checked={!showStarred && !showUnRead}
              onChange={() => {
                setShowUnRead(false)
                setShowStarred(false)
              }}
            />
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <input
              id="hide-starred"
              type="checkbox"
              checked={showStarred}
              onChange={() => setShowStarred(!showStarred)}
            >

            </input>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={showUnRead}
              onChange={() => setShowUnRead(!showUnRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {/* Render a list of emails here */}
        { (getEmails() && getEmails().map((e) => (
          <>
            <li className={e.read ? 'email read' : 'email unread'}>
              <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                checked={e.read}
                onChange={() => handleToggleRead(e)}
              />
              </div>
              <div className="star">
              <input
                checked={e.starred}
                className="star-checkbox"
                type="checkbox"
                onChange={() => handleToggleStar(e)}
              />
              </div>
              <div className="sender">{e.sender}</div>
              <div className="title">{e.title}</div>
            </li>
          </>
        )))
        }

      </main>
    </div>
  )
}

export default App
