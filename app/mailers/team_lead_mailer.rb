class TeamLeadMailer < ApplicationMailer
  default from: 'intervention@email.com'

  def intervention_email
    @project_name = params[:project_name]
    @team_lead_email = params[:team_lead_email]
    @question_text = params[:question_text]
    @yes_votes_count = params[:yes_votes_count]
    @no_votes_count = params[:no_votes_count]
    @total_votes = @yes_votes_count + @no_votes_count
    @url = params[:url]
    
    mail(to: @team_lead_email, subject: "Intervention Results for #{@project_name}")
  end
end
