import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { UsersList } from './components/UsersList/';
import { UsersDetails } from './components/UsersDetails/';
import './App.scss';

const App: React.FC = () => {
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [user, setUser] = useState<User | null>(null);

    return (
        <div className="App">
            <header className="App__header">
                <label>
                    GitHub Searcher
                </label>
            </header>

            <main className="App__main">
                <div className="App__sidebar">
                    <UsersList
                        selectedUserId={selectedUserId}
                        setSelectedUserId={setSelectedUserId}
                        setUser={setUser}
                    />
                </div>

                <div className="App__content">
                    {user === null
                        ? <h2>Select an User</h2>
                        : <UsersDetails user={user} />}
                </div>
            </main>
        </div>
    );
};

export default App;
