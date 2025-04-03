module ApiResponse
  extend ActiveSupport::Concern

  def success_response(data)
    if  data.present?
      render json: { status: 'success', data: data }, status: :ok
    else
      render json: { status: 'not_found', message: "No #{params["controller"]} found", data: [] }, status: :not_found
    end
  end

  def error_response(message)
    render json: { status: 'error', message: message }, status: :unprocessable_entity
  end
end
