import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Notes from '../../Routes/Notes';
import Note from '../../Routes/Note';
import Add from '../../Routes/Add';
import Edit from '../../Routes/Edit';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Notes} />
        <Route path={"/add"} component={Add} />
        <Route path={"/note/:id"} component={Note} />
        <Route path={"/edit/:id"} component={Edit} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
