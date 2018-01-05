defmodule Redirection.Mixfile do
  use Mix.Project

  def project do
    [app: :redirection,
     version: "0.1.0",
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.3",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps]
  end

  def application do
    [applications: [:logger]]
  end

  defp deps do
    [{:xeethemescript, "~> 0.3.0"},
     {:json_diff_ex, "~> 0.6.0"},
     {:transmap, "~> 0.4.0"}]
  end
end
