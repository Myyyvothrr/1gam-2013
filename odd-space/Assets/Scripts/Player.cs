using UnityEngine;
using System.Collections;

public class Player : Ship
{
    public float speed;

    private Vector3 _movement;

    private int _points = 0;
    private float _shield = 100;

    private bool _can_shoot = true;
    private float _shoot_delay = 0.5f;
    private float _shoot_timer = 0f;

    public TextMesh text_score;
    public TextMesh text_hp;
    public TextMesh text_shield;

    public GameObject shield;

    public Game game;

    private bool flying_in = false;

    void Start()
    {
        _points = 0;

        hitpoints = 100;

        transform.position = new Vector3(transform.position.x, -5, -10);

        StartCoroutine(fly_in());
    }

    IEnumerator fly_in()
    {
        flying_in = true;

        while (transform.position.z < 0 || transform.position.y < 0)
        {
            if (transform.position.z < 0)
                transform.Translate(0, 0, 5 * Time.deltaTime);

            if (transform.position.y < 0)
                transform.Translate(0, 3 * Time.deltaTime, 0);

            yield return new WaitForEndOfFrame();
        }

        transform.position = new Vector3(transform.position.x, 0f, 0f);
        Camera.main.transform.position = new Vector3(transform.position.x, Camera.main.transform.position.y, Camera.main.transform.position.z);
        Camera.main.transform.parent = transform;

        flying_in = false;
    }

    void Update()
    {
        if (game.is_paused())
            return;

        if (!killed && !flying_in)
        {
            _movement.x = Input.GetAxis("Horizontal") * speed;
            _movement.y = 0;
            _movement.z = 0;

            _movement *= Time.deltaTime;

            transform.Translate(_movement);

            rigidbody.velocity = Vector3.zero;

            if (!_can_shoot)
            {
                _shoot_timer -= Time.deltaTime;
                if (_shoot_timer <= 0f)
                    _can_shoot = true;
            }

            if (_can_shoot && Input.GetButton("Fire1"))
            {
                fire(gameObject, transform.forward);
                _can_shoot = false;
                _shoot_timer = _shoot_delay;
            }

            if (Input.GetButtonDown("Fire2"))
            {
                shield.renderer.enabled = !shield.renderer.enabled;
            }

            text_hp.text = "Ship: " + hitpoints + "%";
            text_score.text = "Score: " + _points;
            text_shield.text = "Shield: " + (int)_shield + "%";
        }

        shield.transform.Rotate(shield.transform.up, 10f * Time.deltaTime);

        if (shield.renderer.enabled)
        {
            _shield -= 30 * Time.deltaTime;

            if (_shield <= 0)
            {
                shield.renderer.enabled = false;
            }
        }
        else
        {
            if (_shield < 100)
            {
                _shield += 10 * Time.deltaTime;
            }
        }
    }

    void FixedUpdate()
    {
        if (killed)
        {
            rigidbody.AddTorque(Random.Range(-400f, 400f), Random.Range(-400f, 400f), Random.Range(-400f, 400f));
        }
    }

    override public void receive_damage(int amount)
    {
        if (shield.renderer.enabled)
            return;

        hitpoints -= amount;

        if (hitpoints <= 0)
        {
            killed = true;
            audio.PlayOneShot(sound_explosion);
            Camera.main.transform.parent = null;

            collider.enabled = false;
            rigidbody.useGravity = true;
            rigidbody.constraints = RigidbodyConstraints.None;
            
            GameObject obj;
            Vector3 pos = transform.position;
            int r = Random.Range(10, 20);
            for (int i = 0; i < r; ++i)
            {
                pos.x += Random.Range(-2f, 2f);
                pos.y += Random.Range(-1f, 1f);
                pos.z += Random.Range(-2f, 2f);
                obj = (GameObject)Instantiate(debris_prefab, pos, Quaternion.identity);
                obj.rigidbody.AddExplosionForce(Random.Range(300f, 800f), transform.position, Random.Range(20f, 40f));
            }

            game.game_over(_points);

            Destroy(gameObject, 3f);
        }
    }

    override public void add_points(int amount)
    {
        _points += amount;
    }
}
