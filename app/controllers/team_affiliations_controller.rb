class TeamAffiliationsController < ApplicationController
  before_action :set_team_affiliation, only: %i[ show update destroy ]

  # GET /team_affiliations
  def index
    @team_affiliations = TeamAffiliation.all

    render json: @team_affiliations
  end

  # GET /team_affiliations/1
  def show
    render json: @team_affiliation
  end

  # POST /team_affiliations
  def create
    @team_affiliation = TeamAffiliation.new(team_affiliation_params)

    if @team_affiliation.save
      render json: @team_affiliation, status: :created, location: @team_affiliation
    else
      render json: @team_affiliation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /team_affiliations/1
  def update
    if @team_affiliation.update(team_affiliation_params)
      render json: @team_affiliation
    else
      render json: @team_affiliation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /team_affiliations/1
  def destroy
    @team_affiliation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team_affiliation
      @team_affiliation = TeamAffiliation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def team_affiliation_params
      params.require(:team_affiliation).permit(:team_id, :player_id, :session_id)
    end
end
