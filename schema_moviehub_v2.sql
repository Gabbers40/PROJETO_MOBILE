CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  foto_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS public.genres (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(60) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS public.movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(150) NOT NULL,
  description TEXT,
  year INTEGER NOT NULL,
  director VARCHAR(120),
  duration INTEGER,
  rating NUMERIC(2,1),
  status VARCHAR(20) NOT NULL,
  favorite BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  trailer_url TEXT,
  genre_id INTEGER REFERENCES public.genres(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_movie_favorite UNIQUE (user_id, movie_id)
);
INSERT INTO public.genres (nome)
VALUES
  ('Ação'),
  ('Comédia'),
  ('Drama'),
  ('Ficção Científica'),
  ('Terror'),
  ('Suspense'),
  ('Animação'),
  ('Documentário'),
  ('Romance')
ON CONFLICT (nome) DO NOTHING;
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email, foto_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'foto_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem visualizar todos os perfis"
  ON public.profiles FOR SELECT
  USING (true);
CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
CREATE POLICY "Todos os usuários autenticados podem visualizar gêneros"
  ON public.genres FOR SELECT
  TO authenticated
  USING (true);
CREATE POLICY "Usuários podem visualizar apenas seus próprios filmes"
  ON public.movies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem inserir seus próprios filmes"
  ON public.movies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar seus próprios filmes"
  ON public.movies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar seus próprios filmes"
  ON public.movies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem visualizar suas próprias avaliações"
  ON public.ratings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem inserir suas próprias avaliações"
  ON public.ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar suas próprias avaliações"
  ON public.ratings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem visualizar seus próprios favoritos"
  ON public.favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem inserir seus próprios favoritos"
  ON public.favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar seus próprios favoritos"
  ON public.favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);