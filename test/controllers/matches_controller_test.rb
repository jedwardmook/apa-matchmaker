require "test_helper"

class MatchesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @match = matches(:one)
  end

  test "should get index" do
    get matches_url, as: :json
    assert_response :success
  end

  test "should create match" do
    assert_difference("Match.count") do
      post matches_url, params: { match: { date_played: @match.date_played, player_one_games_won: @match.player_one_games_won, player_one_id: @match.player_one_id, player_one_points: @match.player_one_points, player_two_games_won: @match.player_two_games_won, player_two_id: @match.player_two_id, player_two_points: @match.player_two_points } }, as: :json
    end

    assert_response :created
  end

  test "should show match" do
    get match_url(@match), as: :json
    assert_response :success
  end

  test "should update match" do
    patch match_url(@match), params: { match: { date_played: @match.date_played, player_one_games_won: @match.player_one_games_won, player_one_id: @match.player_one_id, player_one_points: @match.player_one_points, player_two_games_won: @match.player_two_games_won, player_two_id: @match.player_two_id, player_two_points: @match.player_two_points } }, as: :json
    assert_response :success
  end

  test "should destroy match" do
    assert_difference("Match.count", -1) do
      delete match_url(@match), as: :json
    end

    assert_response :no_content
  end
end
