defmodule Redirection.Host do
  def get_filter(data) do
    %{}
  end

  def filter_data(data) do
    Transmap.transform(data, get_filter(data), diff: false)
  end

  def redirect(data, src, dest) do
    {:ok, %{data: data, experiment: %{src => %{redirect: dest}}}}
  end
end
