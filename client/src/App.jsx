import "./App.css";
import "antd/dist/reset.css";
import { Space } from "antd";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import More from "./components/pages/LearnMore";
import Main from "./components/pages/Home";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/LearnMore/:id" element={<More />} />
            </Routes>
          </div>
        </ApolloProvider>
      </BrowserRouter>
    </Space>
  );
};

export default App;
