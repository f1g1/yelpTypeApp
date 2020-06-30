import React, { useEffect, useState } from "react";
import Search from "../../Resuables/FiltersSearches/Search";
import StarsDropdown from "../../Resuables/FiltersSearches/StarsDropdown";
import Review from "../../Resuables/Reviews/Review";
import * as S from "./GeneralInfoCardStyles";
import Grid from "@material-ui/core/Grid";
import DatePicker from "../../Resuables/FiltersSearches/DatePicker";
import { ReviewService } from "../../../services/ReviewService";
import { Button } from "@material-ui/core";

const defaultFilter = {
  search: "",
  stars: "",
  date1: null,
  date2: null
};

export default function ReviewsList(props) {
  const [filteredReviews, setfilteredReviews] = useState();
  const [filters, setFilters] = useState(defaultFilter);
  const [reviews, setReviews] = useState([]);
  const [searchValue, setsearchValue] = useState();
  useEffect(() => {
    setfilteredReviews(props.reviews);
    if (props.search) {
      search(props.search);
    }
  }, []);
  useEffect(() => {
    if (reviews !== props.reviews) {
      setReviews(props.reviews);
      setfilteredReviews(props.reviews);
      handleFilter();
    }
    if (searchValue !== props.searchValue) {
      setsearchValue(props.searchValue);
      setFilters({ ...filters, search: props.searchValue });
      handleFilter();
    }
  });
  useEffect(() => {
    console.log(JSON.stringify(filters));
    handleFilter();
  }, [filters]);
  const handleClearFilter = () => {
    search("");
    setFilters(defaultFilter);
    handleFilter();
  };
  const search = value => {
    // setreviews(ReviewService.getFiltered(props.placeId, value));
    value.trim();
    setFilters({ ...filters, search: value });
    // setfilteredReviews(
    //   filteredReviews.filter(
    //     x =>
    //       x.tags.toLowerCase().includes(value.toLowerCase()) ||
    //       x.text.toLowerCase().includes(value.toLowerCase())
    //   )
    // );
    props.handleSearchChanged(value);
  };
  const filterStars = value => {
    // setreviews(ReviewService.getFilteredStars(props.placeId, value));
    // setfilteredReviews(filteredReviews.filter(x => x.rating === value));
    setFilters({ ...filters, stars: value });
  };

  const handleFilterStartDate = date => {
    // let x = filteredReviews.filter(x => new Date(x.date) >= new Date(date));
    // setfilteredReviews(x);
    setFilters({ ...filters, date1: date });
  };
  const handleFilterFinishDate = date => {
    // let x = filteredReviews.filter(x => new Date(x.date) <= new Date(date));
    // setfilteredReviews(x);
    setFilters({ ...filters, date2: date });
  };
  const handleFilter = () => {
    let reviewsC = props.reviews;
    let f = filters;
    if (filters.search && filters.search !== "")
      reviewsC = reviewsC.filter(
        x =>
          x.tags.toLowerCase().includes(filters.search.toLowerCase()) ||
          x.text.toLowerCase().includes(filters.search.toLowerCase())
      );
    if (filters.stars && filters.stars !== "")
      reviewsC = reviewsC.filter(x => x.rating === filters.stars);
    if (filters.date1) {
      reviewsC = reviewsC.filter(
        x => new Date(x.date) >= new Date(filters.date1)
      );
    }
    if (filters.date2) {
      reviewsC = reviewsC.filter(
        x => new Date(x.date) <= new Date(filters.date2)
      );
    }
    props.reviews && setfilteredReviews(reviewsC);
  };

  const handleDeleteReview = id => {
    var succeded = ReviewService.Delete(id);
    props.handleRefresh();
  };
  return (
    <>
      {!props.noFilter && (
        <Grid container justify="space-around">
          <Search search={search} searchValue={props.searchValue} />
          <StarsDropdown
            filterStars={filterStars}
            value={filters.stars}
          ></StarsDropdown>
          <Grid container justify="space-around">
            <DatePicker
              label="From date"
              value={filters.date1}
              handleDateChange={handleFilterStartDate}
            />
            <DatePicker
              value={filters.date1}
              label="To date"
              handleDateChange={handleFilterFinishDate}
            />
          </Grid>
          {filters !== {} && (
            <Button onClick={handleClearFilter}>Clear filters...</Button>
          )}
        </Grid>
      )}
      <S.Line>
        <S.EffectiveContainer>
          <S.Reviews>
            {filteredReviews &&
              filteredReviews.map(x => (
                <Review
                  key={x.id}
                  handleDelete={handleDeleteReview}
                  handleRefresh={props.handleRefresh}
                  review={x}
                />
              ))}
          </S.Reviews>
        </S.EffectiveContainer>
      </S.Line>
    </>
  );
}
