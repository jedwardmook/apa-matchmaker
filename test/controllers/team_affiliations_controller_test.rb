require "test_helper"

class TeamAffiliationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @team_affiliation = team_affiliations(:one)
  end

  test "should get index" do
    get team_affiliations_url, as: :json
    assert_response :success
  end

  test "should create team_affiliation" do
    assert_difference("TeamAffiliation.count") do
      post team_affiliations_url, params: { team_affiliation: { player_id: @team_affiliation.player_id, session_id: @team_affiliation.session_id, team_id: @team_affiliation.team_id } }, as: :json
    end

    assert_response :created
  end

  test "should show team_affiliation" do
    get team_affiliation_url(@team_affiliation), as: :json
    assert_response :success
  end

  test "should update team_affiliation" do
    patch team_affiliation_url(@team_affiliation), params: { team_affiliation: { player_id: @team_affiliation.player_id, session_id: @team_affiliation.session_id, team_id: @team_affiliation.team_id } }, as: :json
    assert_response :success
  end

  test "should destroy team_affiliation" do
    assert_difference("TeamAffiliation.count", -1) do
      delete team_affiliation_url(@team_affiliation), as: :json
    end

    assert_response :no_content
  end
end
