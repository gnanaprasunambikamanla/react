import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "https://gnanaprasunambikamanla.github.io/react/";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL + "/data.json"); // optional: if you use a separate JSON file
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch {
        setError("Unable to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const filter = data.filter((food) =>
      food.name.toLowerCase().includes(searchValue)
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data.filter(
      (food) => food.type.toLowerCase() === type.toLowerCase()
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    { name: "All", type: "all" },
    { name: "9 a.m", type: "breakfast" },
    { name: "12 p.m", type: "lunch" },
    { name: "8 p.m", type: "dinner" },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container bgImage={`${BASE_URL}/bg.png`}>
        <TopContainer>
          <div className="logo">
            <img src= "yum.svg" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="Explore" />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              key={value.name}
              isSelected={selectedBtn === value.type}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>

      <SearchResult
        data={filteredData.map((food) => ({
          ...food,
          image: `${BASE_URL}${food.image}`,
        }))}
      />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-image: url(${({ bgImage }) => bgImage});
  background-size: cover;
  background-position: center;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#754545ff" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
