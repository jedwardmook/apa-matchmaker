require "test_helper"

class CreateMatchesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @create_match = create_matches(:one)
  end

  test "should get index" do
    get create_matches_url, as: :json
    assert_response :success
  end

  test "should create create_match" do
    assert_difference("CreateMatch.count") do
      post create_matches_url, params: { create_match: { lag_loser_games_won: @create_match.lag_loser_games_won, lag_loser_id: @create_match.lag_loser_id, lag_loser_points_earned: @create_match.lag_loser_points_earned, lag_winner_games_won: @create_match.lag_winner_games_won, lag_winner_id: @create_match.lag_winner_id, lag_winner_points_earned: @create_match.lag_winner_points_earned, match_date: @create_match.match_date, session_id: @create_match.session_id } }, as: :json
    end

    assert_response :created
  end

  test "should show create_match" do
    get create_match_url(@create_match), as: :json
    assert_response :success
  end

  test "should update create_match" do
    patch create_match_url(@create_match), params: { create_match: { lag_loser_games_won: @create_match.lag_loser_games_won, lag_loser_id: @create_match.lag_loser_id, lag_loser_points_earned: @create_match.lag_loser_points_earned, lag_winner_games_won: @create_match.lag_winner_games_won, lag_winner_id: @create_match.lag_winner_id, lag_winner_points_earned: @create_match.lag_winner_points_earned, match_date: @create_match.match_date, session_id: @create_match.session_id } }, as: :json
    assert_response :success
  end

  test "should destroy create_match" do
    assert_difference("CreateMatch.count", -1) do
      delete create_match_url(@create_match), as: :json
    end

    assert_response :no_content
  end
end
