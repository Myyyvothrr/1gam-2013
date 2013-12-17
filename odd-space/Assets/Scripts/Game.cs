using UnityEngine;
using System.Collections;

public class Game : MonoBehaviour
{
    public GameObject walls;
    public GameObject wall_prefab;

    public GameObject player_prefab;
    public GameObject enemy_prefab;

    private int _walls_half_num_heights = 2;
    private int _walls_depth = 64;
    private int _walls_half_distance = 50;
    private float _walls_half_random = 0.3f;

    private Vector3 _enemy_pos = new Vector3(0, 0, 120);
    private Quaternion _enemy_rot = Quaternion.Euler(0, 180, 0);

    private enum State
    {
        MENU,
        HELP,
        CREDITS,
        USERNAME,
        PLAY,
        GAMEOVER,
        HIGHSCORES,
        PAUSED
    };

    private State _state = State.MENU;
    private State _state_old = State.MENU;
    private State _state_backup = State.MENU;

    private string _username_temp = "";
    private string _username = "";
    private int _score = 0;

    public GUISkin gui_skin;
    public GUISkin gui_skin_ouya;
    public GUISkin gui_skin_highscore_names;
    public GUISkin gui_skin_highscore_scores;

    public Texture2D ouya_button_ok;
    public Texture2D ouya_button_back;

    private Rect _rect_ouya;
    private Rect _rect_ouya_ok_img;
    private Rect _rect_ouya_ok_text;
    private Rect _rect_ouya_back_img;
    private Rect _rect_ouya_back_text;

    private Rect _rect_group;
    private Rect _rect_title;
    private Rect _rect_play_btn;
    private Rect _rect_credits_btn;
    private Rect _rect_quit_btn;
    private Rect _rect_web_btn;
    private Rect _rect_back_btn;
    private Rect _rect_back_btn2;
    private Rect _rect_text;
    private Rect _rect_text_textfield;

    private Rect _rect_highscores_group;
    private Rect _rect_highscores_scores;
    private Rect _rect_highscores_names;

    private bool _is_ouya = false;

    private int _buttons_index = 0;
    private string[] _buttons_names = { "a", "b", "c", "d", "e" };

    private bool _used_mouse_button = false;

    public const float DEADZONE = 0.3f;

    private Highscore _highscore;
    private bool _upload_allowed = false;

    private float _up_down_axis = 0f;
    private float _up_down_axis_old = 0f;

    void Start()
    {
        Time.timeScale = 0f;

        _highscore = new Highscore();
        
        _rect_group = new Rect((Screen.width - 512) * 0.5f, (Screen.height - 512) * 0.5f, 512, 512);

        _rect_title = new Rect(0, 48, 512, 40);
        _rect_play_btn = new Rect(128, 216, 256, 40);
        _rect_credits_btn = new Rect(128, 316, 256, 40);
        _rect_web_btn = new Rect(128, 266, 256, 40);
        _rect_quit_btn = new Rect(128, 366, 256, 40);

        _rect_text = new Rect(0, 0, 512, 412);
        _rect_back_btn = new Rect(128, 462, 256, 40);
        _rect_back_btn2 = new Rect(128, 412, 256, 40);
        _rect_text_textfield = new Rect(0, 420, 512, 30);

        _rect_highscores_group = new Rect((Screen.width - 1024) * 0.5f, (Screen.height - 512) * 0.5f, 1024, 512);
        _rect_highscores_names = new Rect(0, 0, 512, 36);
        _rect_highscores_scores = new Rect(512, 0, 512, 36);

        _rect_ouya = new Rect((Screen.width - 256) * 0.5f, (Screen.height - 128), 256, 48);
        _rect_ouya_ok_img = new Rect(128, 0, 48, 48);
        _rect_ouya_ok_text = new Rect(160, 0, 90, 48);
        _rect_ouya_back_img = new Rect(0, 0, 48, 48);
        _rect_ouya_back_text = new Rect(32, 0, 90, 48);

        Screen.lockCursor = false;

        StartCoroutine(spawn_walls());
    }

    void OnGUI_OuyaButtons(string text_ok, string text_back)
    {
        if (!_is_ouya)
            return;

        GUI.skin = gui_skin_ouya;
        GUI.BeginGroup(_rect_ouya);

        if (text_back.Length > 0)
        {
            GUI.Label(_rect_ouya_back_img, ouya_button_back);
            GUI.Label(_rect_ouya_back_text, text_back);
        }

        if (text_ok.Length > 0)
        {
            GUI.Label(_rect_ouya_ok_img, ouya_button_ok);
            GUI.Label(_rect_ouya_ok_text, text_ok);
        }

        GUI.EndGroup();
        GUI.skin = null;
    }

    private float get_axis_down_helper()
    {
        if ((_up_down_axis_old <= 0.1f && _up_down_axis_old >= -0.1f) && (_up_down_axis >= 0.1f || _up_down_axis <= -0.1f))
            return _up_down_axis;

        return 0f;
    }

    private bool not_used_mouse_button()
    {
        return !_used_mouse_button;
    }

    private bool used_mouse_button()
    {
        return _used_mouse_button;
    }

    private void update_button_index(int num_buttons)
    {
        if (get_axis_down_helper() >= 0.5f)
        {
            _buttons_index = (++_buttons_index) % num_buttons;
        }
        else if (get_axis_down_helper() <= -0.5f)
        {
            --_buttons_index;
            if (_buttons_index < 0)
                _buttons_index = num_buttons - 1;
        }
    }

    void Update()
    {
        _up_down_axis_old = _up_down_axis;

        _up_down_axis = Input.GetAxisRaw("Vertical");
        
        _used_mouse_button = Input.GetMouseButton(0);
        
        switch (_state)
        {
            case State.MENU:
                {
                    update_button_index(4);

                    if (Input.GetButtonDown("Fire1") && not_used_mouse_button())
                    {
                        switch (_buttons_index)
                        {
                            case 0: toggle_help(); break;
                            case 1: toggle_highscores(); break;
                            case 2: toggle_credits(); break;
                            case 3: Application.Quit(); break;
                            default: break;
                        }
                    }

                    break;
                }
            case State.CREDITS:
                {
                    update_button_index(2);

                    if (Input.GetButtonDown("Fire1") && not_used_mouse_button())
                    {
                        switch (_buttons_index)
                        {
                            case 0: Application.OpenURL("http://www.myyyvothrr.de"); break;
                            case 1: toggle_credits(); break;
                            default: break;
                        }
                    }

                    if (Input.GetButtonDown("Fire2"))
                    {
                        toggle_credits();
                    }

                    break;
                }
            case State.HELP:
                {
                    update_button_index(2);
                    
                    if (Input.GetButtonDown("Fire2"))
                    {
                        toggle_help();
                    }
                    else if (Input.GetButtonDown("Fire1") && not_used_mouse_button())
                    {
                        switch (_buttons_index)
                        {
                            case 0: start_game(); break;
                            case 1: toggle_help(); break;
                            default: break;
                        }
                    }

                    break;
                }
            case State.USERNAME:
                {
                    update_button_index(1);

                    if (Input.GetButtonDown("Fire1") && not_used_mouse_button())
                    {
                        switch (_buttons_index)
                        {
                            case 0: _buttons_index = 1; break;
                            case 1: save_username(); toggle_username(); break;
                            default: break;
                        }
                    }

                    break;
                }
            case State.HIGHSCORES:
                {
                    update_button_index(2);

                    if (Input.GetButtonDown("Fire1") && not_used_mouse_button())
                    {
                        switch (_buttons_index)
                        {
                            case 0: toggle_highscores(); break;
                            case 1: toggle_username(); break;
                            default: break;
                        }
                    }

                    if (Input.GetButtonDown("Fire2"))
                    {
                        toggle_highscores();
                    }

                    break;
                }
            case State.PLAY:
                {
                    if (Input.GetKeyDown(KeyCode.Escape))
                        toggle_paused();

                    break;
                }
            case State.PAUSED:
                {
                    if (Input.GetKeyDown(KeyCode.Escape))
                        toggle_paused();

                    update_button_index(2);

                    if (Input.GetButtonDown("Fire1") && not_used_mouse_button())
                    {
                        switch (_buttons_index)
                        {
                            case 0: toggle_paused(); break;
                            case 1: toggle_menu(); break;
                            default: break;
                        }
                    }

                    if (Input.GetButtonDown("Fire2"))
                    {
                        Application.LoadLevel(1);
                    }

                    break;
                }
            case State.GAMEOVER:
                {
                    update_button_index(2);

                    if (Input.GetButtonDown("Fire1") && not_used_mouse_button())
                    {
                        switch (_buttons_index)
                        {
                            case 0: start_game(); break;
                            case 1: toggle_menu(); break;
                            default: break;
                        }
                    }

                    if (Input.GetButtonDown("Fire2"))
                    {
                        toggle_menu();
                    }

                    break;
                }
            default: break;
        }
    }

    void gui_focus_control()
    {
        if (_buttons_index > -1)
            GUI.FocusControl(_buttons_names[_buttons_index]);
    }

    void OnGUI()
    {
        GUI.skin = gui_skin;
        GUI.BeginGroup(_rect_group);

        switch (_state)
        {
            case State.MENU:
                {
                    GUI.skin.label.fontSize = 48;
                    GUI.Label(_rect_title, "ODD SPACE");
                    GUI.skin.label.fontSize = 26;

                    GUI.SetNextControlName(_buttons_names[0]);
                    if (GUI.Button(_rect_play_btn, "Play") && used_mouse_button())
                        toggle_help();

                    GUI.SetNextControlName(_buttons_names[1]);
                    if (GUI.Button(_rect_web_btn, "Highscores") && used_mouse_button())
                       toggle_highscores();

                    GUI.SetNextControlName(_buttons_names[2]);
                    if (GUI.Button(_rect_credits_btn, "Credits") && used_mouse_button())
                        toggle_credits();

                    GUI.SetNextControlName(_buttons_names[3]);
                    if (GUI.Button(_rect_quit_btn, "Quit") && used_mouse_button())
                        Application.Quit();

                    gui_focus_control();

                    break;
                }
            case State.CREDITS:
                {
                    GUI.Label(_rect_text, "ODD SPACE\n\nJuly One Game A Month Game by Daniel Baumartz\n\nThanks PhilBam\n\nMade with Unity");

                    if (!_is_ouya)
                    {
                        GUI.SetNextControlName(_buttons_names[1]);
                        if (GUI.Button(_rect_back_btn, "Back") && used_mouse_button())
                            toggle_credits();

                        GUI.SetNextControlName(_buttons_names[0]);
                        if (GUI.Button(_rect_back_btn2, "Myyyvothrr.de") && used_mouse_button())
                            Application.OpenURL("http://www.myyyvothrr.de");

                        gui_focus_control();
                    }

                    break;
                }
            case State.HELP:
                {
                    if (!_is_ouya)
                    {
                        GUI.Label(_rect_text, "Fight your way through this endless odd world...\n\nA/D or Left/Right to move\nLeft mouse button to shoot\nRight mouse button to activate / deactivate shield");

                        GUI.SetNextControlName(_buttons_names[0]);
                        if (GUI.Button(_rect_back_btn2, "Start") && used_mouse_button())
                            start_game();

                        GUI.SetNextControlName(_buttons_names[1]);
                        if (GUI.Button(_rect_back_btn, "Back") && used_mouse_button())
                            toggle_help();

                        gui_focus_control();
                    }
                    else
                    {
                        GUI.Label(_rect_text, "Fight your way through this endless odd world...\n\nLS to move\nO to shoot\nU to activate / deactivate shield");
                    }

                    break;
                }
            case State.USERNAME:
                {
                    GUI.Label(_rect_text, "Enter your username to enable online highscore uploading. Only your user name and the score will be saved. Leave empty to disable. Start with @ to link to your Twitter profile.");

                    GUI.SetNextControlName(_buttons_names[0]);
                    _username = GUI.TextField(_rect_text_textfield, _username, 128);

                    if (!string.IsNullOrEmpty(_username) && !_username.Equals(_username_temp))
                    {
                        _username_temp = (_username[0] == '@' || char.IsLetterOrDigit(_username[0])) ? _username[0].ToString() : "";

                        for (int i = 1; i < _username.Length; ++i)
                        {
                            if (_username[i] == '_' || _username[i] == '-' || _username[i] == '_' || char.IsLetterOrDigit(_username[i]))
                                _username_temp += _username[i];
                            else if (_username[i] == ' ')
                                _buttons_index = 1;
                        }

                        _username = _username_temp;
                    }

                    if (!_is_ouya)
                    {
                        GUI.SetNextControlName(_buttons_names[1]);
                        if (GUI.Button(_rect_back_btn, "OK") && used_mouse_button())
                        {
                            save_username();

                            toggle_username();
                        }
                    }

                    gui_focus_control();

                    break;
                }
            case State.HIGHSCORES:
                {
                    GUI.EndGroup();

                    GUI.BeginGroup(_rect_highscores_group);

                    if (_highscore.highscore_list_names.Length == _highscore.highscore_list_scores.Length)
                    {
                        for (int i = 0; i < _highscore.highscore_list_names.Length; ++i)
                        {
                            _rect_highscores_names.y = i * _rect_highscores_names.height;
                            _rect_highscores_scores.y = i * _rect_highscores_scores.height;

                            GUI.skin = gui_skin_highscore_names;

                            if (!string.IsNullOrEmpty(_highscore.highscore_list_names[i]))
                            {
                                if (!_is_ouya && _highscore.highscore_list_names[i][0] == '@')
                                {
                                    if (GUI.Button(_rect_highscores_names, _highscore.highscore_list_names[i]) && used_mouse_button())
                                        Application.OpenURL("https://twitter.com/" + _highscore.highscore_list_names[i].Substring(1));
                                }
                                else
                                    GUI.Label(_rect_highscores_names, _highscore.highscore_list_names[i]);
                            }

                            GUI.skin = gui_skin_highscore_scores;

                            if (!string.IsNullOrEmpty(_highscore.highscore_list_scores[i]))
                                GUI.Label(_rect_highscores_scores, _highscore.highscore_list_scores[i]);
                        }
                    }

                    GUI.EndGroup();

                    GUI.skin = gui_skin;
                    GUI.BeginGroup(_rect_group);

                    if (!_is_ouya)
                    {
                        GUI.SetNextControlName(_buttons_names[0]);
                        if (GUI.Button(_rect_back_btn2, "Back") && used_mouse_button())
                            toggle_highscores();

                        GUI.SetNextControlName(_buttons_names[1]);
                        if (GUI.Button(_rect_back_btn, "Change Name") && used_mouse_button())
                            toggle_username();

                        gui_focus_control();
                    }

                    break;
                }
            case State.PLAY:
                {
                    break;
                }
            case State.PAUSED:
                {
                    GUI.Label(_rect_text, "Paused...");

                    if (!_is_ouya)
                    {
                        GUI.SetNextControlName(_buttons_names[0]);
                        if (GUI.Button(_rect_back_btn2, "Resume") && used_mouse_button())
                            toggle_paused();

                        GUI.SetNextControlName(_buttons_names[1]);
                        if (GUI.Button(_rect_back_btn, "Quit") && used_mouse_button())
                            toggle_menu();

                        gui_focus_control();
                    }

                    break;
                }            
            case State.GAMEOVER:
                {
                    GUI.Label(_rect_text, "In the end, the odd space defeated you...\n\nYour score: " + _score + "\n\n\nOnline Highscore is " + (_upload_allowed ? "enabled" : "disables"));

                    GUI.SetNextControlName(_buttons_names[1]);
                    if (GUI.Button(_rect_back_btn, "Quit") && used_mouse_button())
                        toggle_menu();

                    GUI.SetNextControlName(_buttons_names[0]);
                    if (GUI.Button(_rect_back_btn2, "Again") && used_mouse_button())
                        start_game();

                    gui_focus_control();

                    break;
                }
            default: break;
        }

        GUI.EndGroup();
        GUI.skin = null;

        switch (_state)
        {
            case State.MENU:
                {
                    OnGUI_OuyaButtons("Select", "Quit");
                    break;
                }
            case State.CREDITS:
                {
                    OnGUI_OuyaButtons("Select", "Back");
                    break;
                }
            case State.HELP:
                {
                    OnGUI_OuyaButtons("Start", "Back");
                    break;
                }
            case State.USERNAME:
                {
                    OnGUI_OuyaButtons("OK", "");
                    break;
                }
            case State.HIGHSCORES:
                {
                    OnGUI_OuyaButtons("Change Name", "Back");
                    break;
                }
            case State.PLAY:
                {
                    break;
                }
            case State.PAUSED:
                {
                    OnGUI_OuyaButtons("Resume", "Quit");
                    break;
                }
            case State.GAMEOVER:
                {
                    OnGUI_OuyaButtons("Again", "Quit");
                    break;
                }
            default: break;
        }
    }

    private void save_username()
    {
        PlayerPrefs.SetString("username", _username);

        try
        {
            Debug.Log("Saving new username: " + _username);
            PlayerPrefs.Save();
        }
        catch (PlayerPrefsException ex)
        {
            Debug.Log("playerprefs error: " + ex.Message);
        }
    }

    void start_game()
    {
        if (!PlayerPrefs.HasKey("username"))
        {
            toggle_username();
            return;
        }
        else
        {
            _username = PlayerPrefs.GetString("username", "");
            _upload_allowed = !string.IsNullOrEmpty(_username);
            Debug.Log("Username = " + _username + "  |  Upload allowed = " + _upload_allowed);
        }

        Screen.lockCursor = true;

        Time.timeScale = 1f;

        GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
        for (int i = 0; i < enemies.Length; ++i)
            Destroy(enemies[i]);

        Camera.main.transform.parent = null;
        GameObject player = GameObject.FindGameObjectWithTag("Player");
        if (player != null)
            Destroy(player);

        GameObject obj = (GameObject)Instantiate(player_prefab, Vector3.zero, Quaternion.identity);
        obj.GetComponent<Player>().game = this;

        _buttons_index = 0;
        _state = State.PLAY;

        StartCoroutine("SpawnEnemies");
    }

    private void toggle_state(State new_state)
    {
        _buttons_index = 0;

        if (_state == new_state)
        {
            _state = _state_old;
            _state_old = new_state;
        }
        else
        {
            _state_old = _state;            
            _state = new_state;
        }

        if (_state == State.PAUSED || _state_old == State.PAUSED)
            Time.timeScale = _state == State.PAUSED ? 0f : 1f;
    }

    void toggle_menu()
    {
        toggle_state(State.MENU);

        if (_state == State.MENU)
        {
            GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
            for (int i = 0; i < enemies.Length; ++i)
                Destroy(enemies[i]);

            GameObject[] lasers = GameObject.FindGameObjectsWithTag("Laser");
            for (int i = 0; i < lasers.Length; ++i)
                Destroy(lasers[i]);

            Camera.main.transform.parent = null;
            GameObject player = GameObject.FindGameObjectWithTag("Player");
            if (player != null)
                Destroy(player);
            
            StopCoroutine("SpawnEnemies");

            StartCoroutine(recenter_camera(true));

            Screen.lockCursor = false;
        }
    }

    void toggle_paused()
    {
        if (_state == State.PLAY || _state == State.PAUSED)
        {
            toggle_state(State.PAUSED);
        }
    }

    void toggle_credits()
    {
        toggle_state(State.CREDITS);
    }

    void toggle_help()
    {
        toggle_state(State.HELP);
    }

    void toggle_username()
    {
        _buttons_index = 0;

        if (_state == State.USERNAME)
        {
            _state = _state_backup;
        }
        else
        {
            _state_backup = _state;
            _state = State.USERNAME;
        }
    }

    void toggle_highscores()
    {
        toggle_state(State.HIGHSCORES);

        if (_state == State.HIGHSCORES)
            StartCoroutine(_highscore.get());
    }

    IEnumerator SpawnEnemies()
    {
        while (true)
        {
            yield return new WaitForSeconds(Random.Range(1f, 3f));

            _enemy_pos.x = Random.Range(-30, 30);
            Instantiate(enemy_prefab, _enemy_pos, _enemy_rot);
        }
    }

    public void game_over(int score)
    {
        StopCoroutine("SpawnEnemies");

        StartCoroutine(recenter_camera());

        _score = score;

        Screen.lockCursor = false;

        _state = State.GAMEOVER;

        if (_upload_allowed)
            StartCoroutine(_highscore.post(_score, _username));
    }

    public bool is_paused()
    {
        return _state == State.PAUSED;
    }

    IEnumerator recenter_camera(bool freeze_when_done = false)
    {
        Camera.main.transform.parent = null;

        Vector3 cam_pos = new Vector3(0f, 0f, 0f);
        Vector3 cam_pos_target = new Vector3(0, 5.5f, -9.5f);
        Vector3 cam_pos_start = Camera.main.transform.position;

        float time_start = Time.time;
        while (true)
        {
            float t = (Time.time - time_start) / 3f;
            cam_pos = Vector3.Slerp(cam_pos_start, cam_pos_target, t);
            Camera.main.transform.position = cam_pos;

            yield return new WaitForEndOfFrame();

            if (cam_pos == cam_pos_target)
            {
                break;
            }
        }

        if (freeze_when_done)
            Time.timeScale = 0f;
    }

    private IEnumerator spawn_walls()
    {
        GameObject wall = null;
        Vector3 pos = new Vector3(0, 0, 0);
        Quaternion rot = Quaternion.identity;

        for (int j = -_walls_half_num_heights; j < _walls_half_num_heights; ++j)
        {
            for (int i = 0; i < _walls_depth; ++i)
            {
                pos.y = 8 * j;
                pos.z = 2 * i - 2;

                pos.x = -_walls_half_distance + Random.Range(-_walls_half_random, _walls_half_random);
                wall = (GameObject)Instantiate(wall_prefab, pos, rot);
                wall.transform.parent = walls.transform;
                wall.AddComponent<Wall>();

                pos.x = _walls_half_distance + Random.Range(-_walls_half_random, _walls_half_random);
                wall = (GameObject)Instantiate(wall_prefab, pos, rot);
                wall.transform.parent = walls.transform;
                wall.AddComponent<Wall>();

                yield return new WaitForEndOfFrame();
            }
        }
    }
}
