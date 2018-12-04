import React from "react";
import SearchPresenter from "./SearchPresenter";
import { tv } from "../../api";

export default class extends React.Component {
  state = {
    loading: false,
    error: null,
    popular: [],
    topRated: [],
    airingToday: []
  };

  componentDidMount = async () => {
    try {
      const {
        data: { results: popular }
      } = await tv.getPopular();
      const {
        data: { results: topRated }
      } = await tv.getTopRated();
      const {
        data: { results: airingToday }
      } = await tv.getAiringToday();
      this.setState({
        popular,
        topRated,
        airingToday
      });
    } catch {
      this.setState({
        error: "Could not get tv shows"
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { loading, error, popular, topRated, airingToday } = this.state;
    return (
      <SearchPresenter
        loading={loading}
        error={error}
        popular={popular}
        topRated={topRated}
        airingToday={airingToday}
      />
    );
  }
}
